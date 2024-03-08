import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeConstructionValidation } from '../ConstructionValidation'
import { UpdateConstructionService } from './UpdateConstructionService'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'
import { IUpdateConstructionService } from '../../../domain/service/construction/updateConstruction/IUpdateConstructionService'

interface FactoryTypes {
  updateConstructionService: IUpdateConstructionService
}

export const makeUpdateConstructionService = (): FactoryTypes => {
  const validator = makeConstructionValidation()
  const constructionRepository = new PrismaConstructionRepository(prismaClient.getClient())

  const updateConstructionService = new UpdateConstructionService(constructionRepository, validator)

  return { updateConstructionService }
}
