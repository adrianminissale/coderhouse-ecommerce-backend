import express from 'express';
import cookieParser from 'cookie-parser';
import fetch from 'node-fetch';
import dayjs from 'dayjs';
import { denormalize, schema } from 'normalizr';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import compression from 'compression';
import log4js from 'log4js';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import 'dotenv/config';
import enviarMail from './services/gmail.services';
import enviarSMS from './services/twilio.services';

log4js.configure({
  appenders: {
    loggerConsole: { type: 'console' },
    loggerFileWarn: { type: 'file', filename: 'warn.log' },
    loggerFileError: { type: 'file', filename: 'error.log' },
  },
  categories: {
    default: { appenders: ['loggerConsole'], level: 'trace' },
    info: { appenders: ['loggerConsole'], level: 'info' },
    warn: { appenders: ['loggerFileWarn'], level: 'warn' },
    error: { appenders: ['loggerFileError'], level: 'error' },
  },
});
const loggerInfo = log4js.getLogger('info');
const loggerWarn = log4js.getLogger('warn');
const loggerError = log4js.getLogger('error');

loggerInfo.info('FACEBOOK_CLIENT_ID: ', process.env.FACEBOOK_CLIENT_ID);
loggerInfo.info('FACEBOOK_CLIENT_SECRET: ', process.env.FACEBOOK_CLIENT_SECRET);

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID || '',
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email'],
}, (accessToken, refreshToken, profile :any, done) => done(null, profile)));

passport.serializeUser((user :any, done) => {
  done(null, user);
});

passport.deserializeUser((obj :any, done) => {
  done(null, obj);
});

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8080;
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');
const auth = require('./middleware/auth.middleware');
const products = require('./routes/products.routes');
const cart = require('./routes/cart.routes');
const chats = require('./routes/chats.routes');
const ecommerceConnection = require('./database/ecommerce.db.ts');

if (process.env.MODE === 'cluster' && cluster.isMaster) {
  loggerInfo.info(`Número de procesadores: ${numCPUs}`);
  loggerInfo.info(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i += 1) cluster.fork();

  cluster.on('exit', (worker :any) => {
    loggerInfo.info('Worker', worker.process.pid, 'died', new Date().toLocaleString());
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    loggerInfo.info(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`);
    ecommerceConnection();
  });

  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(auth);
  app.use(cookieParser());
  app.use(session({
    store: MongoStore.create({
      mongoUrl: process.env.DB_SESSION,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 600,
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.set('view engine', 'pug');
  app.set('views', `${__dirname}/views`);

  app.use('/products', products);
  app.use('/cart', cart);
  app.use('/chats', chats);

  app.get('/', (req: any, res) => {
    (async () => {
      try {
        const chatsApi = await fetch('http://localhost:8080/chats')
          .then((_res) => _res.json())
          .then((data) => {
            const user = new schema.Entity('user');
            const chat = new schema.Entity('chat', { author: user }, { idAttribute: 'text' });
            const denormalizeChats = denormalize(data.result, [chat], data.entities);
            loggerInfo.info('OBJETO DENORMALIZADO: ', JSON.stringify(denormalizeChats).length);

            return denormalizeChats.map((_chat: any) => ({
              // eslint-disable-next-line
              _id: _chat._id,
              email: _chat.author.id,
              message: _chat.text,
              time: _chat.time,
            }));
          });
        const productsApi = await fetch('http://localhost:8080/products').then((_res) => _res.json());
        const user = req.user ? {
          name: req.user.displayName,
          photo: req.user.photos[0].value,
          email: req.user.emails[0].value,
        } : '';

        res.render('partials/form', { productsApi, chatsApi, user });
      } catch (error: any) {
        loggerWarn.info(`Error en servidor ${error}`);
        loggerError.error(`Error en servidor ${error}`);
      }
    })();
  });

  app.get('/login', (req: any, res) => {
    if (req.isAuthenticated()) {
      const nombre = req.user.displayName;
      const foto = req.user.photos[0].value;
      const email = req.user.emails[0].value;
      const asunto = 'logging In';
      const mensaje = `Ingresó ${nombre} en la fecha ${new Date().toLocaleString()}`;
      enviarMail(asunto, mensaje, foto, email, (err :any, info :any) => {
        if (err) console.log(err);
        else console.log(info);
        res.redirect('/');
      });
    } else {
      res.redirect('/auth/facebook');
    }
  });

  app.get('/logout', (req: any, res) => {
    const username = req.user ? req.user.displayName : '';
    if (username) {
      req.logout();
      req.session.destroy();

      const asunto = 'logging Out';
      const mensaje = `Egresó ${username} en la fecha ${new Date().toLocaleString()}`;
      const email = process.env.GMAIL_USER;
      enviarMail(asunto, mensaje, null, email, (err :any, info :any) => {
        if (err) console.log(err);
        else console.log(info);
        res.render('partials/logout', { username });
      });
    } else {
      res.redirect('/');
    }
  });

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/faillogin',
  }));

  app.get('/faillogin', (req, res) => {
    res.render('partials/login-error', {});
  });

  app.get('/failregister', (req, res) => {
    res.render('partials/register-error', {});
  });

  app.get('/info', (req, res) => {
    const info = {
      arguments: process.argv,
      path: process.execPath,
      so: process.platform,
      processId: process.pid,
      nodeVersion: process.version,
      numCPUs,
      folder: process.cwd(),
      memory: process.memoryUsage().rss,
    };
    // console.log(info)
    res.render('partials/info', info);
  });

  io.on('connection', (socket :any) => {
    socket.on('newProduct', (newProduct: any) => {
      fetch('http://localhost:8080/products', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: { 'Content-Type': 'application/json' },
      });
      io.sockets.emit('newProduct', newProduct);
    });

    socket.on('newChat', async (newChat: any) => {
      const chat = newChat;
      chat.time = dayjs(chat.time || Date()).format('DD/MM/YYYY HH:mm:ss');
      fetch('http://localhost:8080/chats', {
        method: 'POST',
        body: JSON.stringify(chat),
        headers: { 'Content-Type': 'application/json' },
      });

      if (chat.text.includes('administrador')) {
        console.log('MENSAJE SMS AL ADMIN');
        const mensaje = `El usuario ${chat.author.email} te envió el mensaje: ${chat.text}`;
        const rta = await enviarSMS(mensaje, '+54911nnnnnnnn');
        console.log(rta);
      }

      io.sockets.emit('newChat', chat);
    });
  });

  app.use(express.static(`${__dirname}/public`));
}
