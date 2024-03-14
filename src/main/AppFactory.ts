import { makeCompanyController } from '../api/controller/company/CompanyControllerFactory'
import { makeHomeController } from '../api/controller/home/HomeControllerFactory'
import { makeLoginController } from '../api/controller/login/LoginControllerFactory'
import { makeUserController } from '../api/controller/user/userControllerFactory'
import { App } from './App'

export const makeApp = (): App => {
  const userController = makeUserController()
  const homeController = makeHomeController()
  const loginController = makeLoginController()
  const companyController = makeCompanyController()
  const app = new App([
    loginController,
    userController,
    homeController,
    companyController
  ])

  return app
}
