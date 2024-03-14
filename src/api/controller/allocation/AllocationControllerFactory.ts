import { makeAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { AllocationController } from './AllocationController'

export const makeAllocationController = (): AllocationController => {
  const allocationService = makeAllocationService()
  const userService = makeUserService()
  const constructionService = makeConstructionService()
  return new AllocationController(allocationService, userService, constructionService)
}
