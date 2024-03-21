import { makeCompanyService } from '../../../service/company/CompanyServiceFactory'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { CompanyController } from './CompanyController'

export const makeCompanyController = (): CompanyController => {
  const companyService = makeCompanyService()
  const userService = makeUserService()
  return new CompanyController(companyService, userService)
}
