import { GetUserService } from './GetUserService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaUserRepository } from '../../../data/repository/user/UserRepository'
import { IGetUserService } from '../../../domain/service/user/getUser/IGetuserService'

interface FactoryTypes {
  getUserService: IGetUserService
}

export const makeGetUserService = (): FactoryTypes => {
  const userRepository = new PrismaUserRepository(prismaClient.getClient())

  const getUserService = new GetUserService(userRepository)

  return { getUserService }
}
