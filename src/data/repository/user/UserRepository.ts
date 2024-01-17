import { PrismaClient } from '@prisma/client'
import { IUser } from '../../../domain/data/entity/IUser'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'

export class PrismaUserRepository implements IUserRepository {
  constructor (readonly _prismaClient: PrismaClient) {}

  async insertUser (data: IUser): Promise<IUser> {
    if (!data.cpf) {
      throw new Error('[ENTITY- USER]: CPF Obrigatório')
    }

    const user = await this._prismaClient.user.findUnique({ where: { cpf: data.cpf } })

    if (user) {
      throw new Error('[ENTITY- USER]: Usuário já cadastrado')
    }

    const register = await this._prismaClient.user.create({ data })

    return register
  }

  async updateUser (userToUpdate: IUser): Promise<IUser> {
    if (!userToUpdate.cpf) {
      throw new Error('[ENTITY- USER]: CPF Obrigatório')
    }

    const user = await this._prismaClient.user.findUnique({ where: { cpf: userToUpdate.cpf } })

    if (!user) {
      throw new Error('[ENTITY- USER]: Usuário não encontrado')
    }

    const data = {
      city: userToUpdate.city,
      road: userToUpdate.road,
      name: userToUpdate.name,
      email: userToUpdate.email,
      phone: userToUpdate.phone,
      admin: userToUpdate.admin,
      office: userToUpdate.office,
      zipCode: userToUpdate.zipCode,
      password: userToUpdate.password,
      numberHouse: userToUpdate.numberHouse,
      neighborhood: userToUpdate.neighborhood
    }

    const register = await this._prismaClient.user.update({ data, where: { cpf: userToUpdate.cpf } })

    return register
  }

  async getUsers (): Promise<IUser[]> {
    const listUser = await this._prismaClient.user.findMany()

    return listUser
  }

  async getUser (cpf: string): Promise<IUser> {
    const user = await this._prismaClient.user.findUnique({ where: { cpf: cpf } })

    return user
  }

  async deleteUser (cpf: string): Promise<IUser> {
    const user = await this.getUser(cpf)

    if (!user) {
      throw new Error('[ENTITY- USER]: Usuário não encontrado')
    }

    const deleted = await this._prismaClient.user.delete({ where: { cpf } })

    return deleted
  }
}
