import { ICompany } from '../../../data/entity/ICompany'

export interface IGetCompaniesService {
  handler (id: number): Promise<ICompany[]|Error>
}
