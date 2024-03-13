import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeCompanyValidation } from '../CompanyValidation'
import { UpdateCompanyService } from './UpdateCompanyService'
import { PrismaCompanyRepository } from '../../../data/repository/company/CompanyRepository'
import { IUpdateCompanyService } from '../../../domain/service/company/updateCompany/IUpdateCompanyService'

interface FactoryTypes {
  updateCompanyService: IUpdateCompanyService
}

export const makeUpdateCompanyService = (): FactoryTypes => {
  const validator = makeCompanyValidation()
  const repository = new PrismaCompanyRepository(prismaClient.getClient())

  const updateCompanyService = new UpdateCompanyService(repository, validator)

  return { updateCompanyService }
}
