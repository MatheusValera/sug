import { DeleteUserService } from './DeleteUserService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaUserRepository } from '../../../data/repository/user/UserRepository'
import { IDeleteUserService } from '../../../domain/service/user/deleteUser/IDeleteUserService'

interface FactoryTypes {
  deleteService: IDeleteUserService
}

export const makeDeleteUserService = (): FactoryTypes => {
  const userRepository = new PrismaUserRepository(prismaClient.getClient())

  const deleteService = new DeleteUserService(userRepository)

  return { deleteService }
}
