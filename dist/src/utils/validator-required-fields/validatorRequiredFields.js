"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireFieldValidation = void 0;
class RequireFieldValidation {
    constructor(field) {
        this.field = field;
    }
    validate(input) {
        if (!input[this.field])
            return new Error(`No ${this.field} provided.`);
    }
}
exports.RequireFieldValidation = RequireFieldValidation;
