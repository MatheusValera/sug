import { UserController } from './UserController'
import { makeUserService } from '../../../service/user/UserServiceFactory'

export const makeLoginController = (): UserController => {
  const userService = makeUserService()
  return new UserController(userService)
}
