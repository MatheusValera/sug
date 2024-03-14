import { ICompany } from '../../../domain/data/entity/ICompany'
import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { ICompanyRepository } from '../../../domain/data/repository/company/ICompany'
import { IDeleteCompanyService } from '../../../domain/service/company/deleteCompany/IDeleteCompanyService'
import { IConstructionService } from '../../construction/ConstructionServiceFactory'

export class DeleteCompanyService implements IDeleteCompanyService {
  constructor (private readonly _companyRepository: ICompanyRepository,
    private readonly _constructionRepository: IConstructionService) {}

  async handler (id: number): Promise<ICompany|Error> {
    if (!id) {
      return new Error('No id provided')
    }

    const constructions = await this._constructionRepository.getConstructionsService.handler() as IConstruction[]

    const hasConstructionsActive = constructions.some(c => c.companyId === id && c.status === 'active')

    if (hasConstructionsActive) {
      return new Error('Possui construção ativa para essa companhia.')
    }

    const companyDeleted = await this._companyRepository.deleteCompany(id)

    return companyDeleted
  }
}
