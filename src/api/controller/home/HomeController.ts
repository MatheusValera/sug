import express from 'express'
import { IRequest } from '../../common/IRequest'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { requireLogin } from '../../middleware/RequireLogin'

export class HomeController implements IController {
  public router = express.Router()

  constructor () {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/home', requireLogin, this.handler.bind(this))
  }

  async handler (req: IRequest, res: IResponse): Promise<any> {
    // if (req.user) {
    //   res.status(200).redirect('/center')
    //   return
    // }
    res.status(200).render('./home.pug', {
      buttons: [{
        link: '/user',
        text: 'Gerenciar colaboradores'
      }, {
        link: '/construction',
        text: 'Gerenciar obras'
      }]
    })
  }
}