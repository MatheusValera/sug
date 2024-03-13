import { IReport } from '../../../data/entity/IReport'
import { EOptions } from '../../allocation/getAllocation/IGetAllocationService'

export interface IGetReportService {
  handler (id: number, option: EOptions): Promise<IReport|Error>
}
