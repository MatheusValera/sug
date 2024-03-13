import { IReport } from '../../../data/entity/IReport'

export interface IGetReportsService {
  handler (id: number): Promise<IReport[]|Error>
}
