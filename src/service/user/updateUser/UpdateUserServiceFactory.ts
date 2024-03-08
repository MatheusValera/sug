import { makeUserValidation } from '../UserValidation'
import { UpdateUserService } from './UpdateUserService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { EncryptAdapter } from '../../../infra/cryptography/EncryptAdapter'
import { PrismaUserRepository } from '../../../data/repository/user/UserRepository'
import { IUpdateUserService } from '../../../domain/service/user/updateUser/IUpdateUserService'

interface FactoryTypes {
  updateUserService: IUpdateUserService
}

export const makeUpdateUserService = (): FactoryTypes => {
  const validator = makeUserValidation()
  const _salt = parseInt(process.env.SALT)
  const encryptAdapter = new EncryptAdapter(_salt)
  const userRepository = new PrismaUserRepository(prismaClient.getClient())

  const updateUserService = new UpdateUserService(userRepository, validator, encryptAdapter)

  return { updateUserService }
}
