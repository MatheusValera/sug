import { IReport } from '../../../data/entity/IReport'

export interface IUpdateReportService {
  handler (report: IReport): Promise<IReport|Error>
}
