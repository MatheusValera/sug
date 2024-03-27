import express from 'express'
import { IRequest } from '../../common/IRequest'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { requireLogin } from '../../middleware/RequireLogin'
import { IUserService } from '../../../service/user/UserServiceFactory'
import { getUserButtons } from '../../../utils/control-button'

export class HomeController implements IController {
  public router = express.Router()

  constructor (private readonly _userService: IUserService) {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/', requireLogin, this.handler.bind(this))
  }

  async handler (req: IRequest, res: IResponse): Promise<any> {
    const email = req.user.email
    const user = await this._userService.getUserService.handler('email', email)

    const buttons = await getUserButtons(user)
    res.status(200).render('./home.pug', { user, ...buttons })
  }
}
