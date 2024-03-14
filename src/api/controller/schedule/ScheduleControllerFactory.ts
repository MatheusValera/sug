import { makeAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { makeScheduleService } from '../../../service/schedule/ScheduleServiceFactory'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { ScheduleController } from './ScheduleController'

export const makeScheduleController = (): ScheduleController => {
  const scheduleService = makeScheduleService()
  const userService = makeUserService()
  const constructionservice = makeConstructionService()
  const allocationService = makeAllocationService()
  return new ScheduleController(scheduleService, userService, constructionservice, allocationService)
}
