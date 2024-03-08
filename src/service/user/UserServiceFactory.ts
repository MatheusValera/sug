import { makeGetUserService } from './getUser/GetUserServiceFactory'
import { makeSaveUserService } from './saveUser/SaveUserServiceFactory'
import { makeUpdateUserService } from './updateUser/UpdateUserServiceFactory'
import { makeDeleteUserService } from './deleteUser/DeleteUserServiceFactory'
import { IGetUserService } from '../../domain/service/user/getUser/IGetuserService'
import { ISaveUserService } from '../../domain/service/user/saveUser/ISaveUserService'
import { IDeleteUserService } from '../../domain/service/user/deleteUser/IDeleteUserService'
import { IUpdateUserService } from '../../domain/service/user/updateUser/IUpdateUserService'

export interface IUserService {
  getUserService: IGetUserService
  saveUserService: ISaveUserService
  updateUserService: IUpdateUserService
  deleteService: IDeleteUserService

}

export const makeUserService = (): IUserService => {
  const getUserService = makeGetUserService().getUserService
  const saveUserService = makeSaveUserService().saveUserService
  const updateUserService = makeUpdateUserService().updateUserService
  const deleteService = makeDeleteUserService().deleteService

  return {
    getUserService,
    saveUserService,
    updateUserService,
    deleteService
  }
}
