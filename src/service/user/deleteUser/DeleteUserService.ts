import { IUser } from '../../../domain/data/entity/IUser'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { IDeleteUserService } from '../../../domain/service/user/deleteUser/IDeleteUserService'

export class DeleteUserService implements IDeleteUserService {
  constructor (private readonly _userRepository: IUserRepository) {}

  async handler (id: number): Promise<IUser|Error> {
    if (!id) {
      throw new Error('No id provided')
    }

    const userDeleted = await this._userRepository.deleteUser(id)

    return userDeleted
  }
}
