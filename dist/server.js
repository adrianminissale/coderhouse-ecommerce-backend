"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var dayjs_1 = __importDefault(require("dayjs"));
var normalizr_1 = require("normalizr");
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var passport_1 = __importDefault(require("passport"));
var compression_1 = __importDefault(require("compression"));
var log4js_1 = __importDefault(require("log4js"));
var passport_facebook_1 = require("passport-facebook");
require("dotenv/config");
var gmail_services_1 = __importDefault(require("./services/gmail.services"));
var twilio_services_1 = __importDefault(require("./services/twilio.services"));
log4js_1.default.configure({
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
var loggerInfo = log4js_1.default.getLogger('info');
var loggerWarn = log4js_1.default.getLogger('warn');
var loggerError = log4js_1.default.getLogger('error');
loggerInfo.info('FACEBOOK_CLIENT_ID: ', process.env.FACEBOOK_CLIENT_ID);
loggerInfo.info('FACEBOOK_CLIENT_SECRET: ', process.env.FACEBOOK_CLIENT_SECRET);
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID || '',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email'],
}, function (accessToken, refreshToken, profile, done) { return done(null, profile); }));
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (obj, done) {
    done(null, obj);
});
var app = (0, express_1.default)();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 8080;
var numCPUs = require('os').cpus().length;
var cluster = require('cluster');
var auth = require('./middleware/auth.middleware');
var products = require('./routes/products.routes');
var cart = require('./routes/cart.routes');
var chats = require('./routes/chats.routes');
var ecommerceConnection = require('./database/ecommerce.db');
if (process.env.MODE === 'cluster' && cluster.isMaster) {
    loggerInfo.info("N\u00FAmero de procesadores: ".concat(numCPUs));
    loggerInfo.info("PID MASTER ".concat(process.pid));
    for (var i = 0; i < numCPUs; i += 1)
        cluster.fork();
    cluster.on('exit', function (worker) {
        loggerInfo.info('Worker', worker.process.pid, 'died', new Date().toLocaleString());
        cluster.fork();
    });
}
else {
    app.listen(PORT, function () {
        loggerInfo.info("Servidor express escuchando en el puerto ".concat(PORT, " - PID WORKER ").concat(process.pid));
        ecommerceConnection();
    });
    app.use((0, compression_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded());
    app.use(auth);
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_session_1.default)({
        store: connect_mongo_1.default.create({
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
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.set('view engine', 'pug');
    app.set('views', "".concat(__dirname, "/views"));
    app.use('/products', products);
    app.use('/cart', cart);
    app.use('/chats', chats);
    app.get('/', function (req, res) {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var chatsApi, productsApi, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, node_fetch_1.default)('http://localhost:8080/chats')
                                .then(function (_res) { return _res.json(); })
                                .then(function (data) {
                                var user = new normalizr_1.schema.Entity('user');
                                var chat = new normalizr_1.schema.Entity('chat', { author: user }, { idAttribute: 'text' });
                                var denormalizeChats = (0, normalizr_1.denormalize)(data.result, [chat], data.entities);
                                loggerInfo.info('OBJETO DENORMALIZADO: ', JSON.stringify(denormalizeChats).length);
                                return denormalizeChats.map(function (_chat) { return ({
                                    // eslint-disable-next-line
                                    _id: _chat._id,
                                    email: _chat.author.id,
                                    message: _chat.text,
                                    time: _chat.time,
                                }); });
                            })];
                    case 1:
                        chatsApi = _a.sent();
                        return [4 /*yield*/, (0, node_fetch_1.default)('http://localhost:8080/products').then(function (_res) { return _res.json(); })];
                    case 2:
                        productsApi = _a.sent();
                        user = req.user ? {
                            name: req.user.displayName,
                            photo: req.user.photos[0].value,
                            email: req.user.emails[0].value,
                        } : '';
                        res.render('partials/form', { productsApi: productsApi, chatsApi: chatsApi, user: user });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        loggerWarn.info("Error en servidor ".concat(error_1));
                        loggerError.error("Error en servidor ".concat(error_1));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
    });
    app.get('/login', function (req, res) {
        if (req.isAuthenticated()) {
            var nombre = req.user.displayName;
            var foto = req.user.photos[0].value;
            var email = req.user.emails[0].value;
            var asunto = 'logging In';
            var mensaje = "Ingres\u00F3 ".concat(nombre, " en la fecha ").concat(new Date().toLocaleString());
            (0, gmail_services_1.default)(asunto, mensaje, foto, email, function (err, info) {
                if (err)
                    console.log(err);
                else
                    console.log(info);
                res.redirect('/');
            });
        }
        else {
            res.redirect('/auth/facebook');
        }
    });
    app.get('/logout', function (req, res) {
        var username = req.user ? req.user.displayName : '';
        if (username) {
            req.logout();
            req.session.destroy();
            var asunto = 'logging Out';
            var mensaje = "Egres\u00F3 ".concat(username, " en la fecha ").concat(new Date().toLocaleString());
            var email = process.env.GMAIL_USER;
            (0, gmail_services_1.default)(asunto, mensaje, null, email, function (err, info) {
                if (err)
                    console.log(err);
                else
                    console.log(info);
                res.render('partials/logout', { username: username });
            });
        }
        else {
            res.redirect('/');
        }
    });
    app.get('/auth/facebook', passport_1.default.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/faillogin',
    }));
    app.get('/faillogin', function (req, res) {
        res.render('partials/login-error', {});
    });
    app.get('/failregister', function (req, res) {
        res.render('partials/register-error', {});
    });
    app.get('/info', function (req, res) {
        var info = {
            arguments: process.argv,
            path: process.execPath,
            so: process.platform,
            processId: process.pid,
            nodeVersion: process.version,
            numCPUs: numCPUs,
            folder: process.cwd(),
            memory: process.memoryUsage().rss,
        };
        // console.log(info)
        res.render('partials/info', info);
    });
    io.on('connection', function (socket) {
        socket.on('newProduct', function (newProduct) {
            (0, node_fetch_1.default)('http://localhost:8080/products', {
                method: 'POST',
                body: JSON.stringify(newProduct),
                headers: { 'Content-Type': 'application/json' },
            });
            io.sockets.emit('newProduct', newProduct);
        });
        socket.on('newChat', function (newChat) { return __awaiter(void 0, void 0, void 0, function () {
            var chat, mensaje, rta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chat = newChat;
                        chat.time = (0, dayjs_1.default)(chat.time || Date()).format('DD/MM/YYYY HH:mm:ss');
                        (0, node_fetch_1.default)('http://localhost:8080/chats', {
                            method: 'POST',
                            body: JSON.stringify(chat),
                            headers: { 'Content-Type': 'application/json' },
                        });
                        if (!chat.text.includes('administrador')) return [3 /*break*/, 2];
                        console.log('MENSAJE SMS AL ADMIN');
                        mensaje = "El usuario ".concat(chat.author.email, " te envi\u00F3 el mensaje: ").concat(chat.text);
                        return [4 /*yield*/, (0, twilio_services_1.default)(mensaje, '+54911nnnnnnnn')];
                    case 1:
                        rta = _a.sent();
                        console.log(rta);
                        _a.label = 2;
                    case 2:
                        io.sockets.emit('newChat', chat);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    app.use(express_1.default.static("".concat(__dirname, "/public")));
}
