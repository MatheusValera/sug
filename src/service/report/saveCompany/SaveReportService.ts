import { IReport } from '../../../domain/data/entity/IReport'
import { Validation } from '../../../domain/utils/validator'
import { ISaveReportService } from '../../../domain/service/report/saveReport/ISaveReportService'
import { IReportRepository } from '../../../domain/data/repository/report/IReportRepository'

export class SaveReportService implements ISaveReportService {
  constructor (
    private readonly _reportRepository: IReportRepository,
    private readonly _validator: Validation) {}

  async handler (report: Omit<IReport, 'id'>): Promise<IReport|Error> {
    // @ts-expect-error
    if (report.id) {
      return new Error('A report who already has an ID cannot be saved.')
    }

    const hasIncorrectValue = await this._validator.validate(report)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const result = this._reportRepository.insertReport(report)

    return result
  }
}
