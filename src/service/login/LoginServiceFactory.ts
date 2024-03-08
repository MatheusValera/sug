import { LoginService } from './LoginService'
import { prismaClient } from '../../infra/prisma/PrismaClient'
import { ILoginService } from '../../domain/service/login/ILoginService'
import { EncryptAdapter } from '../../infra/cryptography/EncryptAdapter'
import { PrismaUserRepository } from '../../data/repository/user/UserRepository'

interface FactoryTypes {
  loginService: ILoginService
}

export const makeLoginService = (): FactoryTypes => {
  const _salt = process.env.SALT as unknown as number
  const encryptAdapter = new EncryptAdapter(_salt)

  const userRepository = new PrismaUserRepository(prismaClient.getClient())

  const loginService = new LoginService(encryptAdapter, userRepository)

  return { loginService }
}
