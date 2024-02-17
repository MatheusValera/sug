import { makeLoginController } from '../api/controller/login/LoginControllerFactory'
import { App } from './App'

export const makeApp = (): App => {
  const loginController = makeLoginController()
  const app = new App([
    loginController
  ])

  return app
}
