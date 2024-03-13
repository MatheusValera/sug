import { ISchedule } from '../../../data/entity/ISchedule'

export interface IGetSchedulesService {
  handler (id: number): Promise<ISchedule[]|Error>
}
