import { IReport } from '../../../domain/data/entity/IReport'
import { Validation } from '../../../domain/utils/validator'
import { ISaveReportService } from '../../../domain/service/report/saveReport/ISaveReportService'
import { IReportRepository } from '../../../domain/data/repository/report/IReportRepository'
import { EStatus } from '../../../domain/data/entity/ISchedule'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { EmailService } from '../../../utils/sendEmail'

export class SaveReportService implements ISaveReportService {
  constructor (
    private readonly _reportRepository: IReportRepository,
    private readonly _validator: Validation,
    private readonly _scheduleRepository: ISchedulesRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _constructionRepository: IConstructionRepository) {}

  async handler (report: Omit<IReport, 'id'>): Promise<IReport|Error> {
    // @ts-expect-error
    if (report.id) {
      return new Error('A report who already has an ID cannot be saved.')
    }

    const schedule = await this._scheduleRepository.getSchedule(report.scheduleId)

    report.constructionId = schedule.constructionId
    report.createdAt = new Date()

    const hasIncorrectValue = await this._validator.validate(report)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const result = await this._reportRepository.insertReport(report)

    if (!result) {
      return result
    }

    schedule.status = EStatus.inactive

    await this._scheduleRepository.updateSchedule(schedule)

    if (result) {
      const user = await this._userRepository.getUser('id', result.userId)
      const construction = await this._constructionRepository.getConstruction('id', result.constructionId)

      const message = `${result.createdAt?.toLocaleString('pt-Br').split(',')[0]}. E aqui está um comprovante dela: ${result.description}`

      await EmailService.sendEmail(
        user.email,
        user.name,
        construction.name,
        'uma entrega de relatório',
        message,
        'Você entregou um Relatório!',
        'Venha ver...'
      )
    }

    return result
  }
}
