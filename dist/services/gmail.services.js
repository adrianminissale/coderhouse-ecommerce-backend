"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});
var enviarMail = function (subject, messaje, attach, to, cb) {
    var mailOptions = {
        from: 'Servidor Node.js',
        to: to,
        subject: subject,
        html: messaje,
        attachments: [{
                path: attach,
                filename: 'foto.jpg',
            }],
    };
    transporter.sendMail(mailOptions, function (err, info) {
        cb(err, info);
    });
};
exports.default = enviarMail;
