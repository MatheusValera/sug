import { PrismaClient } from '@prisma/client'
import { ICompany } from '../../../domain/data/entity/ICompany'
import { ICompanyRepository } from '../../../domain/data/repository/company/ICompany'

export class PrismaCompanyRepository implements ICompanyRepository {
  constructor (readonly _prismaClient: PrismaClient) {}

  async insertCompany (data: Omit<ICompany, 'id' |'createdAt'>): Promise<ICompany> {
    if (!data.cnpj) {
      throw new Error('[ENTITY- COMPANY]: CNPJ obrigatório')
    }

    const company = await this._prismaClient.company.findUnique({ where: { cnpj: data.cnpj } })

    if (company) {
      throw new Error('[ENTITY- COMPANY]: Empresa já cadastrada')
    }

    const register = await this._prismaClient.company.create({ data })

    return register
  }

  async updateCompany (companyToUpdate: ICompany): Promise<ICompany> {
    if (!companyToUpdate.cnpj) {
      throw new Error('[ENTITY- COMPANY]: CNPJ obrigatório')
    }

    const company = await this._prismaClient.company.findUnique({ where: { cnpj: companyToUpdate.cnpj } })

    if (!company) {
      throw new Error('[ENTITY- COMPANY]: Empresa não encontrada')
    }

    const data = {
      contact: companyToUpdate.contact,
      nameCompany: companyToUpdate.nameCompany,
      nameResponsiblePerson: companyToUpdate.nameResponsiblePerson,
      contactResponsiblePerson: companyToUpdate.contactResponsiblePerson
    }

    const register = await this._prismaClient.company.update({ data, where: { cnpj: companyToUpdate.cnpj } })

    return register
  }

  async getCompanies (): Promise<ICompany[]> {
    const listCompany = await this._prismaClient.company.findMany()

    return listCompany
  }

  async getCompany (id: number): Promise<ICompany> {
    const company = await this._prismaClient.company.findUnique({ where: { id: id } })

    return company
  }

  async deleteCompany (id: number): Promise<ICompany> {
    const company = await this.getCompany(id)

    if (!company) {
      throw new Error('[ENTITY- COMPANY]: Empresa não encontrada')
    }

    const deleted = await this._prismaClient.company.delete({ where: { id } })

    return deleted
  }
}
