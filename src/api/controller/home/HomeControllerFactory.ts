import { HomeController } from './HomeController'

export const makeHomeController = (): HomeController => {
  return new HomeController()
}
