"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    if (!req.user.admin) {
        res.redirect('/');
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
