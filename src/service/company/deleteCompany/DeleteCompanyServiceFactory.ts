import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { DeleteCompanyService } from './DeleteCompanyService'
import { PrismaCompanyRepository } from '../../../data/repository/company/CompanyRepository'
import { IDeleteCompanyService } from '../../../domain/service/company/deleteCompany/IDeleteCompanyService'
import { makeConstructionService } from '../../construction/ConstructionServiceFactory'

interface FactoryTypes {
  deleteCompanyService: IDeleteCompanyService
}

export const makeDeleteCompanyService = (): FactoryTypes => {
  const companyRepository = new PrismaCompanyRepository(prismaClient.getClient())
  const constructionService = makeConstructionService()
  const deleteCompanyService = new DeleteCompanyService(companyRepository, constructionService)

  return { deleteCompanyService }
}
