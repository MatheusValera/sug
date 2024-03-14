"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppFactory_1 = require("./main/AppFactory");
const app = (0, AppFactory_1.makeApp)();
const server = app.listen().then(() => {
    console.log('\x1b[36mApplication is running at http://localhost:%d in %s mode\x1b[0m', app.app.get('port'), app.app.get('env'));
});
exports.default = server;
