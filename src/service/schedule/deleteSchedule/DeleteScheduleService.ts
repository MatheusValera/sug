import { ISchedule } from '../../../domain/data/entity/ISchedule'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'
import { IDeleteScheduleService } from '../../../domain/service/schedule/deleteSchedule/IDeleteScheduleService'

export class DeleteScheduleService implements IDeleteScheduleService {
  constructor (private readonly _scheduleRepository: ISchedulesRepository) {}

  async handler (id: number): Promise<ISchedule|Error> {
    if (!id) {
      throw new Error('No id provided')
    }

    const scheduleDeleted = await this._scheduleRepository.deleteSchedule(id)

    return scheduleDeleted
  }
}
