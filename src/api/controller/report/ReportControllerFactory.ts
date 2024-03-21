import { makeAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { makeReportService } from '../../../service/report/ReportServiceFactory'
import { makeScheduleService } from '../../../service/schedule/ScheduleServiceFactory'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { ReportController } from './ReportController'

export const makeReportController = (): ReportController => {
  const reportService = makeReportService()
  const userService = makeUserService()
  const scheduleService = makeScheduleService()
  const constructionService = makeConstructionService()
  const allocationService = makeAllocationService()
  return new ReportController(reportService, userService, scheduleService, constructionService, allocationService)
}
