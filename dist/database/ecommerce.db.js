"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var mongoose = require('mongoose');
var ecommerceConnection = function () {
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(function () {
        console.log('Base de datos conectada');
    })
        .catch(function (err) {
        console.log(err);
        throw err;
    });
};
module.exports = ecommerceConnection;
