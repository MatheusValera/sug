import { PrismaAllocationRepository } from '../../../data/repository/allocation/AllocationRepository'
import { IGetAllocationsService } from '../../../domain/service/allocation/getAllocations/IGetAllocationsService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { GetAllocationsService } from './GetAllocationsService'

interface FactoryTypes {
  getAllocationsService: IGetAllocationsService
}

export const makeGetAllocationsService = (): FactoryTypes => {
  const repository = new PrismaAllocationRepository(prismaClient.getClient())

  const getAllocationsService = new GetAllocationsService(repository)

  return { getAllocationsService }
}
