"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireLogin = void 0;
const requireLogin = (req, res, next) => {
    if (!req.user) {
        // Redireciona o usuário para a página de login com o parâmetro de redirecionamento
        res.redirect('/login');
        return;
    }
    next();
};
exports.requireLogin = requireLogin;
