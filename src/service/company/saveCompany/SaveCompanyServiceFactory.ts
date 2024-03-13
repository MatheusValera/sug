import { SaveCompanyService } from './SaveCompanyService'
import { makeCompanyValidation } from '../CompanyValidation'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaCompanyRepository } from '../../../data/repository/company/CompanyRepository'
import { ISaveCompanyService } from '../../../domain/service/company/saveCompany/ISaveCompanyService'

interface FactoryTypes {
  saveCompanyService: ISaveCompanyService
}

export const makeSaveCompanyService = (): FactoryTypes => {
  const validator = makeCompanyValidation()
  const repository = new PrismaCompanyRepository(prismaClient.getClient())

  const saveCompanyService = new SaveCompanyService(repository, validator)

  return { saveCompanyService }
}
