import { LoginController } from './LoginController'
import { EncryptAdapter } from '../../../infra/cryptography/EncryptAdapter'

export const makeLoginController = (): LoginController => {
  const salt = parseInt(process.env.SALT)
  const encryptAdapter = new EncryptAdapter(salt)
  return new LoginController(encryptAdapter)
}
