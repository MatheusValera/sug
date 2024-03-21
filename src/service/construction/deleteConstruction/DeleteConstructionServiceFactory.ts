import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { DeleteConstructionService } from './DeleteConstructionService'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'
import { IDeleteConstructionService } from '../../../domain/service/construction/deleteConstruction/IDeleteConstructionService'
import { makeAllocationService } from '../../allocation/AllocationServiceFactory'

interface FactoryTypes {
  deleteConstructionService: IDeleteConstructionService
}

export const makeDeleteConstructionService = (): FactoryTypes => {
  const constructionRepository = new PrismaConstructionRepository(prismaClient.getClient())

  const allocationService = makeAllocationService()

  const deleteConstructionService = new DeleteConstructionService(constructionRepository, allocationService)

  return { deleteConstructionService }
}
