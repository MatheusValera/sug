import { IAllocation } from '../../../data/entity/IAllocation'

export interface IGetAllocationsService {
  handler (id: number): Promise<IAllocation[]|Error>
}
