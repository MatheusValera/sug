import { makePrismaAllocation } from '../../../data/repository/allocation/AllocationRepositoryFactory'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'
import { makePrismaUserRepository } from '../../../data/repository/user/UserRepositoryFactory'
import { ISaveAllocationService } from '../../../domain/service/allocation/saveAllocation/ISaveAllocationService'
import { Validation } from '../../../domain/utils/validator'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { SaveAllocationService } from './SaveAllocationService'
let saveAllocationService = null
interface FactoryTypes {
  saveAllocationService: ISaveAllocationService
}

export const makeSaveAllocationService = (validator: Validation): FactoryTypes => {
  const repository = makePrismaAllocation()

  const userRepo = makePrismaUserRepository()
  const constructionService = new PrismaConstructionRepository(prismaClient.getClient())

  saveAllocationService = new SaveAllocationService(repository, validator, userRepo, constructionService)

  return { saveAllocationService }
}
