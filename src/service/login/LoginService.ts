import { IUser } from '../../domain/data/entity/IUser'
import { IHasher } from '../../domain/infra/criptography/IHasher'
import { ILoginService } from '../../domain/service/login/ILoginService'
import { IUserRepository } from '../../domain/data/repository/user/IUserRepository'

export class LoginService implements ILoginService {
  constructor (private readonly _hasher: IHasher, private readonly _userRepository: IUserRepository) {}

  async handler (email: string, password: string): Promise<IUser|Error> {
    if (!email || !password) {
      return new Error('Email or password not provided')
    }

    const user = await this._userRepository.getUser('email', email)

    if (!user) {
      return new Error(`The email address ${email} is not associated with any account. `)
    }

    const isMatch = await this._hasher.compare(password, user.password)

    return isMatch ? user : new Error('Incorrect password')
  }
}
