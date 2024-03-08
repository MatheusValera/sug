import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { ConstructionController } from './ConstructionController'

export const makeConstructionController = (): ConstructionController => {
  const constructionService = makeConstructionService()
  return new ConstructionController(constructionService)
}
