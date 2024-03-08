import { IConstruction } from '../../../data/entity/IConstruction'

export interface IGetConstructionService {
  handler (id: number): Promise<IConstruction|Error>
}
