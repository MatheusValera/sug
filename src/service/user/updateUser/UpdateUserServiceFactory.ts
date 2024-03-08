import { makeUserValidation } from '../UserValidation'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaUserRepository } from '../../../data/repository/user/UserRepository'
import { IUpdateUserService } from '../../../domain/service/user/updateUser/IUpdateUserService'
import { UpdateUserService } from './UpdateUserService'

interface FactoryTypes {
  updateUserService: IUpdateUserService
}

export const makeUpdateUserService = (): FactoryTypes => {
  const validator = makeUserValidation()
  const userRepository = new PrismaUserRepository(prismaClient.getClient())

  const updateUserService = new UpdateUserService(userRepository, validator)

  return { updateUserService }
}
