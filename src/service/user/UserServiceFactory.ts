import { makeGetUserService } from './getUser/GetUserServiceFactory'
import { makeSaveUserService } from './saveUser/SaveUserServiceFactory'
import { makeUpdateUserService } from './updateUser/UpdateUserServiceFactory'
import { makeDeleteUserService } from './deleteUser/DeleteUserServiceFactory'
import { IGetUserService } from '../../domain/service/user/getUser/IGetuserService'
import { ISaveUserService } from '../../domain/service/user/saveUser/ISaveUserService'
import { IDeleteUserService } from '../../domain/service/user/deleteUser/IDeleteUserService'
import { IUpdateUserService } from '../../domain/service/user/updateUser/IUpdateUserService'
import { IGetUsersService } from '../../domain/service/user/getUsers/IGetUsersService'
import { makeGetUsersService } from './getUsers/GetUserServiceFactory'

export interface IUserService {
  getUserService: IGetUserService
  getUsersService: IGetUsersService
  saveUserService: ISaveUserService
  updateUserService: IUpdateUserService
  deleteUserService: IDeleteUserService
}

export const makeUserService = (): IUserService => {
  const getUserService = makeGetUserService().getUserService
  const saveUserService = makeSaveUserService().saveUserService
  const updateUserService = makeUpdateUserService().updateUserService
  const deleteUserService = makeDeleteUserService().deleteService
  const getUsersService = makeGetUsersService().getUsersService

  return {
    getUserService,
    saveUserService,
    updateUserService,
    deleteUserService,
    getUsersService
  }
}
