"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAllocationValidation = void 0;
const validator_composite_1 = require("../../utils/validator-composite/validator-composite");
const validatorRequiredFields_1 = require("../../utils/validator-required-fields/validatorRequiredFields");
const makeAllocationValidation = () => {
    const validations = [];
    for (const field of ['userId', 'constructionId']) {
        validations.push(new validatorRequiredFields_1.RequireFieldValidation(field));
    }
    return new validator_composite_1.ValidationComposite(validations);
};
exports.makeAllocationValidation = makeAllocationValidation;
