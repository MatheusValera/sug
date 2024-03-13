import { ISchedule } from '../../../domain/data/entity/ISchedule'
import { Validation } from '../../../domain/utils/validator'
import { ISaveScheduleService } from '../../../domain/service/schedule/saveSchedule/ISaveScheduleService'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'

export class SaveScheduleService implements ISaveScheduleService {
  constructor (
    private readonly _scheduleRepository: ISchedulesRepository,
    private readonly _validator: Validation) {}

  async handler (schedule: Omit<ISchedule, 'id'>): Promise<ISchedule|Error> {
    // @ts-expect-error
    if (schedule.id) {
      return new Error('A schedule who already has an ID cannot be saved.')
    }

    const hasIncorrectValue = await this._validator.validate(schedule)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const result = this._scheduleRepository.insertSchedule(schedule)

    return result
  }
}
