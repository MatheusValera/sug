import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeAllocationValidation } from '../AllocationValidation'
import { UpdateAllocationService } from './UpdateAllocationService'
import { PrismaAllocationRepository } from '../../../data/repository/allocation/AllocationRepository'
import { IUpdateAllocationService } from '../../../domain/service/allocation/updateAllocation/IUpdateAllocationService'

interface FactoryTypes {
  updateAllocationService: IUpdateAllocationService
}

export const makeUpdateAllocationService = (): FactoryTypes => {
  const validator = makeAllocationValidation()
  const repository = new PrismaAllocationRepository(prismaClient.getClient())

  const updateAllocationService = new UpdateAllocationService(repository, validator)

  return { updateAllocationService }
}
