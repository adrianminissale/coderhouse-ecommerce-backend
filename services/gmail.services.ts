import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const enviarMail = (subject :any, messaje :any, attach :any, to :any, cb :any) => {
  const mailOptions = {
    from: 'Servidor Node.js',
    to,
    subject,
    html: messaje,
    attachments: [{
      path: attach,
      filename: 'foto.jpg',
    }],
  };

  transporter.sendMail(mailOptions, (err :any, info :any) => {
    cb(err, info);
  });
};

export default enviarMail;
