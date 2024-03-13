import { PrismaAllocationRepository } from '../../../data/repository/allocation/AllocationRepository'
import { IDeleteAllocationService } from '../../../domain/service/allocation/deleteAllocation/IDeleteAllocationService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { DeleteAllocationService } from './DeleteAllocationService'

interface FactoryTypes {
  deleteAllocationService: IDeleteAllocationService
}

export const makeDeleteAllocationService = (): FactoryTypes => {
  const allocationRepository = new PrismaAllocationRepository(prismaClient.getClient())

  const deleteAllocationService = new DeleteAllocationService(allocationRepository)

  return { deleteAllocationService }
}
