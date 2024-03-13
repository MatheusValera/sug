import { makeScheduleService } from '../../../service/schedule/ScheduleServiceFactory'
import { ScheduleController } from './ScheduleController'

export const makeScheduleController = (): ScheduleController => {
  const scheduleService = makeScheduleService()
  return new ScheduleController(scheduleService)
}
