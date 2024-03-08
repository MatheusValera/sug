import { isValidCPF } from '../../../utils/isValidCPF'
import { IUser } from '../../../domain/data/entity/IUser'
import { Validation } from '../../../domain/utils/validator'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { IUpdateUserService } from '../../../domain/service/user/updateUser/IUpdateUserService'

export class UpdateUserService implements IUpdateUserService {
  constructor (
    private readonly _userRepository: IUserRepository,
    private readonly _validator: Validation) {}

  async handler (user: IUser): Promise<IUser|Error> {
    if (!user.id) {
      return new Error('A user who already no has an ID cannot be saved.')
    }

    if (!isValidCPF(user.cpf)) {
      return new Error('CPF invalid provided.')
    }

    const hasIncorrectValue = await this._validator.validate(user)

    if (!hasIncorrectValue) {
      return hasIncorrectValue
    }

    const result = this._userRepository.updateUser(user)

    return result
  }
}