import { IReport } from '../../../domain/data/entity/IReport'
import { Validation } from '../../../domain/utils/validator'
import { ISaveReportService } from '../../../domain/service/report/saveReport/ISaveReportService'
import { IReportRepository } from '../../../domain/data/repository/report/IReportRepository'
import { EStatus } from '../../../domain/data/entity/ISchedule'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'

export class SaveReportService implements ISaveReportService {
  constructor (
    private readonly _reportRepository: IReportRepository,
    private readonly _validator: Validation,
    private readonly _scheduleRepository: ISchedulesRepository,
    private readonly _allocationRepository: IAllocationRepository) {}

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

    const allocation = await this._allocationRepository.getAllocation(schedule.allocationId)

    allocation.status = EStatus.inactive

    await this._allocationRepository.updateAllocation(allocation)

    return result
  }
}
