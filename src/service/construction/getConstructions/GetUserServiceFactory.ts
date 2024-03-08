import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaUserRepository } from '../../../data/repository/user/UserRepository'
import { IGetUsersService } from '../../../domain/service/user/getUsers/IGetUsersService'
import { GetUsersService } from './GetUsersService'

interface FactoryTypes {
  getUsersService: IGetUsersService
}

export const makeGetUsersService = (): FactoryTypes => {
  const userRepository = new PrismaUserRepository(prismaClient.getClient())

  const getUsersService = new GetUsersService(userRepository)

  return { getUsersService }
}
