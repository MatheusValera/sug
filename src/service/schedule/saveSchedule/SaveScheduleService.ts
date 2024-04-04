import { Validation } from '../../../domain/utils/validator'
import { ISchedule } from '../../../domain/data/entity/ISchedule'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'
import { ISaveScheduleService } from '../../../domain/service/schedule/saveSchedule/ISaveScheduleService'
import { IConstructionService } from '../../construction/ConstructionServiceFactory'
import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { EmailService } from '../../../utils/sendEmail'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'

export class SaveScheduleService implements ISaveScheduleService {
  constructor (
    private readonly _scheduleRepository: ISchedulesRepository,
    private readonly _validator: Validation,
    private readonly _userService: IUserRepository,
    private readonly _constructionService: IConstructionService) {}

  async handler (schedule: Omit<ISchedule, 'id'>): Promise<ISchedule|Error> {
    // @ts-expect-error
    if (schedule.id) {
      return new Error('A schedule who already has an ID cannot be saved.')
    }

    const hasIncorrectValue = await this._validator.validate(schedule)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const hasSchedules = await this._scheduleRepository.getScheduleByUserId(schedule.userId)
    const hasSchedulesInSomeDate = hasSchedules.some(x => new Date(x.dateSchedule).getTime() === new Date(schedule.dateSchedule).getTime())

    if (hasSchedulesInSomeDate) {
      return new Error('User has schedule in some date.')
    }

    schedule.createdAt = new Date()

    const result = await this._scheduleRepository.insertSchedule(schedule)

    if (result) {
      const user = await this._userService.getUser('id', schedule.userId)
      const construction = await this._constructionService.getConstructionService.handler('id', schedule.constructionId) as IConstruction

      await EmailService.sendEmail(
        user.email,
        user.name,
        construction.name,
        'um agendamento',
        new Date(result.dateSchedule).toLocaleString('pt-Br').split(',')[0],
        'Você tem um novo agendamento!',
        'Venha ver...'
      )
    }

    return result
  }
}
