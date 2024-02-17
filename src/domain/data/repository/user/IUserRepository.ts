import { IUser } from '../../entity/IUser'
import { PrismaClient } from '@prisma/client'

export interface IUserRepository {
  readonly _prismaClient: PrismaClient
  getUsers (): Promise<IUser[]>
  deleteUser (cpf: string): Promise<IUser>
  insertUser (data: IUser): Promise<IUser>
  updateUser (userToUpdate: IUser): Promise<IUser>
  getUser (key: string, value: string): Promise<IUser>
}
