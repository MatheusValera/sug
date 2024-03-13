import { makeReportService } from '../../../service/report/ReportServiceFactory'
import { ReportController } from './ReportController'

export const makeReportController = (): ReportController => {
  const reportService = makeReportService()
  return new ReportController(reportService)
}
