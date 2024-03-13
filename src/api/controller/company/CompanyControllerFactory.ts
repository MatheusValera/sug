import { makeCompanyService } from '../../../service/company/CompanyServiceFactory'
import { CompanyController } from './CompanyController'

export const makeCompanyController = (): CompanyController => {
  const companyService = makeCompanyService()
  return new CompanyController(companyService)
}
