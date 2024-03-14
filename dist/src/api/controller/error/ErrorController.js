"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorController = void 0;
class ErrorController {
    static async error404(err, request, response, next) {
        console.error(err);
        if (response.headersSent) {
            next(err);
            return;
        }
        response.status(500).render('errors/404', {
            content: {
                metatags: {
                    title: 'F',
                    description: 'Tente recarregar.'
                }
            }
        });
    }
    static async error500(err, request, response, next) {
        console.error(err);
        if (response.headersSent) {
            next(err);
            return;
        }
        response.status(500).render('errors/500', {
            content: {
                metatags: {
                    title: 'F',
                    description: 'Tente recarregar.'
                }
            }
        });
    }
}
exports.ErrorController = ErrorController;
