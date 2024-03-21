import { makeCompanyService } from '../../../service/company/CompanyServiceFactory'
import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { ConstructionController } from './ConstructionController'

export const makeConstructionController = (): ConstructionController => {
  const constructionService = makeConstructionService()
  const companyService = makeCompanyService()
  const userService = makeUserService()
  return new ConstructionController(constructionService, companyService, userService)
}
