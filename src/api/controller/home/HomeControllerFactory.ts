import { makeAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { makeScheduleService } from '../../../service/schedule/ScheduleServiceFactory'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { HomeController } from './HomeController'

export const makeHomeController = (): HomeController => {
  const userService = makeUserService()
  const scheduleService = makeScheduleService()
  const allocationService = makeAllocationService()
  const constructionService = makeConstructionService()
  return new HomeController(userService, scheduleService, allocationService, constructionService)
}
