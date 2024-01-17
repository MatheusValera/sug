import { IUser } from '../../entity/IUser'
import { PrismaClient } from '@prisma/client'

export interface IUserRepository {
  readonly _prismaClient: PrismaClient
  getUsers (): Promise<IUser[]>
  getUser (cpf: string): Promise<IUser>
  deleteUser (cpf: string): Promise<IUser>
  insertUser (data: IUser): Promise<IUser>
  updateUser (userToUpdate: IUser): Promise<IUser>
}
