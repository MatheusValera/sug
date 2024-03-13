import { Validation } from '../../../domain/utils/validator'
import { ISchedule } from '../../../domain/data/entity/ISchedule'
import { IUpdateScheduleService } from '../../../domain/service/schedule/updateSchedule/IUpdateScheduleService'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'

export class UpdateScheduleService implements IUpdateScheduleService {
  constructor (
    private readonly _scheduleRepository: ISchedulesRepository,
    private readonly _validator: Validation) {}

  async handler (schedule: ISchedule): Promise<ISchedule|Error> {
    if (!schedule.id) {
      return new Error('A schedule who already no has an ID cannot be saved.')
    }

    const hasIncorrectValue = await this._validator.validate(schedule)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const result = this._scheduleRepository.updateSchedule(schedule)

    return result
  }
}
