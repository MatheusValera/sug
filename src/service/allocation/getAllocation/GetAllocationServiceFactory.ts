import { PrismaAllocationRepository } from '../../../data/repository/allocation/AllocationRepository'
import { IGetAllocationService } from '../../../domain/service/allocation/getAllocation/IGetAllocationService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { GetAllocationService } from './GetAllocationService'

interface FactoryTypes {
  getAllocationService: IGetAllocationService
}

export const makeGetAllocationService = (): FactoryTypes => {
  const allocationRepository = new PrismaAllocationRepository(prismaClient.getClient())

  const getAllocationService = new GetAllocationService(allocationRepository)

  return { getAllocationService }
}
