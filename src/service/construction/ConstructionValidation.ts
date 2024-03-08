import { Validation } from '../../domain/utils/validator'
import { ValidationComposite } from '../../utils/validator-composite/validator-composite'
import { RequireFieldValidation } from '../../utils/validator-required-fields/validatorRequiredFields'

export const makeConstructionValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['name', 'companyId']) {
    validations.push(new RequireFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
