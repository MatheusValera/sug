"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCompanyValidation = void 0;
const validator_composite_1 = require("../../utils/validator-composite/validator-composite");
const validatorRequiredFields_1 = require("../../utils/validator-required-fields/validatorRequiredFields");
const makeCompanyValidation = () => {
    const validations = [];
    for (const field of ['cnpj', 'contact', 'nameCompany', 'nameResponsiblePerson', 'contactResponsiblePerson']) {
        validations.push(new validatorRequiredFields_1.RequireFieldValidation(field));
    }
    return new validator_composite_1.ValidationComposite(validations);
};
exports.makeCompanyValidation = makeCompanyValidation;
