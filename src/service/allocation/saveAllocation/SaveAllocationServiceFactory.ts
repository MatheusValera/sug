import { PrismaAllocationRepository } from '../../../data/repository/allocation/AllocationRepository'
import { ISaveAllocationService } from '../../../domain/service/allocation/saveAllocation/ISaveAllocationService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeAllocationValidation } from '../AllocationValidation'
import { SaveAllocationService } from './SaveAllocationService'

interface FactoryTypes {
  saveAllocationService: ISaveAllocationService
}

export const makeSaveAllocationService = (): FactoryTypes => {
  const validator = makeAllocationValidation()
  const repository = new PrismaAllocationRepository(prismaClient.getClient())

  const saveAllocationService = new SaveAllocationService(repository, validator)

  return { saveAllocationService }
}
