import { SaveUserService } from './SaveUserService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaUserRepository } from '../../../data/repository/user/UserRepository'
import { ISaveUserService } from '../../../domain/service/user/saveUser/ISaveUserService'
import { makeUserValidation } from '../UserValidation'
import { EncryptAdapter } from '../../../infra/cryptography/EncryptAdapter'

interface FactoryTypes {
  saveUserService: ISaveUserService
}

export const makeSaveUserService = (): FactoryTypes => {
  const validator = makeUserValidation()
  const _salt = process.env.SALT as unknown as number
  const encryptAdapter = new EncryptAdapter(_salt)
  const userRepository = new PrismaUserRepository(prismaClient.getClient())

  const saveUserService = new SaveUserService(userRepository, validator, encryptAdapter)

  return { saveUserService }
}
