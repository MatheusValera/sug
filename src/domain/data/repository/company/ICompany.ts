import { PrismaClient } from '@prisma/client'
import { ICompany } from '../../entity/ICompany'

export interface ICompanyRepository {
  readonly _prismaClient: PrismaClient
  getCompanies (): Promise<ICompany[]>
  getCompany (cpf: string): Promise<ICompany>
  deleteCompany (cpf: string): Promise<ICompany>
  insertCompany (data: ICompany): Promise<ICompany>
  updateCompany (CompanyToUpdate: ICompany): Promise<ICompany>
}
