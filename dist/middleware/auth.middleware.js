"use strict";
module.exports = function (req, res, next) {
    try {
        var administrator = true;
        var methods = ['GET', 'POST', 'PATCH', 'DELETE'];
        var rutes = ['/', 'products', 'cart'];
        if (!rutes.some(function (rute) { return req.url.includes(rute); })) {
            throw new Error();
        }
        else if (!administrator && methods.some(function (method) { return req.method.includes(method); }) && req.url.includes('products')) {
            res.status(401).json({
                error: -1,
                description: "ruta ".concat(req.url, " m\u00E9todo ").concat(req.method, " no autorizada"),
            });
        }
        else {
            next();
        }
    }
    catch (_a) {
        res.status(401).json({
            error: -2,
            description: "ruta ".concat(req.url, " m\u00E9todo ").concat(req.method, " no implementada"),
        });
    }
};
