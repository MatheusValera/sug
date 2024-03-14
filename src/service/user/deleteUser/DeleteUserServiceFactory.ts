import { DeleteUserService } from './DeleteUserService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaUserRepository } from '../../../data/repository/user/UserRepository'
import { IDeleteUserService } from '../../../domain/service/user/deleteUser/IDeleteUserService'
import { makeAllocationService } from '../../allocation/AllocationServiceFactory'
import { makeScheduleService } from '../../schedule/ScheduleServiceFactory'

interface FactoryTypes {
  deleteService: IDeleteUserService
}

export const makeDeleteUserService = (): FactoryTypes => {
  const userRepository = new PrismaUserRepository(prismaClient.getClient())
  const allocationService = makeAllocationService()
  const schedulesService = makeScheduleService()
  const deleteService = new DeleteUserService(userRepository, allocationService, schedulesService)

  return { deleteService }
}
