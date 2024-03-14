import { makeCompanyService } from '../../../service/company/CompanyServiceFactory'
import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { ConstructionController } from './ConstructionController'

export const makeConstructionController = (): ConstructionController => {
  const constructionService = makeConstructionService()
  const companyService = makeCompanyService()
  return new ConstructionController(constructionService, companyService)
}
