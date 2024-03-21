import { makeUserService } from '../../../service/user/UserServiceFactory'
import { HomeController } from './HomeController'

export const makeHomeController = (): HomeController => {
  const userService = makeUserService()
  return new HomeController(userService)
}
