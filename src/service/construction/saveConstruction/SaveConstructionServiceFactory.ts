import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeConstructionValidation } from '../ConstructionValidation'
import { ISaveConstructionService } from '../../../domain/service/construction/saveConstruction/ISaveConstructionService'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'
import { SaveConstructionService } from './SaveConstructionService'

interface FactoryTypes {
  saveConstructionService: ISaveConstructionService
}

export const makeSaveConstructionService = (): FactoryTypes => {
  const validator = makeConstructionValidation()
  const constructionRepository = new PrismaConstructionRepository(prismaClient.getClient())

  const saveConstructionService = new SaveConstructionService(constructionRepository, validator)

  return { saveConstructionService }
}
