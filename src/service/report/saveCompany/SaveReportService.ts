import { IReport } from '../../../domain/data/entity/IReport'
import { Validation } from '../../../domain/utils/validator'
import { ISaveReportService } from '../../../domain/service/report/saveReport/ISaveReportService'
import { IReportRepository } from '../../../domain/data/repository/report/IReportRepository'
import { IScheduleService } from '../../schedule/ScheduleServiceFactory'
import { EOptions } from '../../../domain/service/allocation/getAllocation/IGetAllocationService'
import { EStatus, ISchedule } from '../../../domain/data/entity/ISchedule'
import { IAllocationService } from '../../allocation/AllocationServiceFactory'
import { IAllocation } from '../../../domain/data/entity/IAllocation'

export class SaveReportService implements ISaveReportService {
  constructor (
    private readonly _reportRepository: IReportRepository,
    private readonly _validator: Validation,
    private readonly _scheduleService: IScheduleService,
    private readonly _allocationService: IAllocationService) {}

  async handler (report: Omit<IReport, 'id'>): Promise<IReport|Error> {
    // @ts-expect-error
    if (report.id) {
      return new Error('A report who already has an ID cannot be saved.')
    }

    const schedule = (await this._scheduleService.getScheduleService.handler(report.scheduleId, EOptions.BY_SCHEDULE))[0] as ISchedule

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

    await this._scheduleService.updateScheduleService.handler(schedule)

    const allocation = (await this._allocationService.getAllocationService.handler(schedule.allocationId, EOptions.BY_ALLOCATION))[0] as IAllocation

    allocation.status = EStatus.inactive

    await this._allocationService.updateAllocationService.handler(allocation)

    return result
  }
}
