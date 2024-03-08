import { makeLoginController } from '../api/controller/login/LoginControllerFactory'
import { makeUserController } from '../api/controller/user/userControllerFactory'
import { App } from './App'

export const makeApp = (): App => {
  const loginController = makeLoginController()
  const userController = makeUserController()
  const app = new App([
    loginController,
    userController
  ])

  return app
}
