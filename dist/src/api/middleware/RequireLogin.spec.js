"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequireLogin_1 = require("./RequireLogin");
describe('requireLogin', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {};
        res = {
            redirect: jest.fn()
        };
        next = jest.fn();
    });
    it('should redirect to login page if user is not authenticated', () => {
        (0, RequireLogin_1.requireLogin)(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith('/login');
    });
    it('should call next middleware if user is authenticated', () => {
        req.user = { email: 'any_email' };
        (0, RequireLogin_1.requireLogin)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.redirect).not.toHaveBeenCalled();
    });
});
