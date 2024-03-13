import { ICompany } from '../../../domain/data/entity/ICompany'
import { ICompanyRepository } from '../../../domain/data/repository/company/ICompany'
import { IDeleteCompanyService } from '../../../domain/service/company/deleteCompany/IDeleteCompanyService'

export class DeleteCompanyService implements IDeleteCompanyService {
  constructor (private readonly _companyRepository: ICompanyRepository) {}

  async handler (id: number): Promise<ICompany|Error> {
    if (!id) {
      return new Error('No id provided')
    }

    const companyDeleted = await this._companyRepository.deleteCompany(id)

    return companyDeleted
  }
}
