import express from 'express'
import { IRequest } from '../../common/IRequest'
import { isAdmin } from '../../middleware/IsAdmin'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { requireLogin } from '../../middleware/RequireLogin'
import { SuccessResponse } from '../../common/responses/SuccessResponse'
import { BadRequestResponse } from '../../common/responses/BadRequestResponse'
import { InternalServerErrorResponse } from '../../common/responses/InternalServerErrorResponse'
import { IUserService } from '../../../service/user/UserServiceFactory'

export class UserController implements IController {
  public router = express.Router()

  constructor (private readonly _userService: IUserService) {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/', requireLogin, isAdmin, this.handler.bind(this))
    this.router.post('/user/getUser', requireLogin, isAdmin, this.getUser.bind(this))
    this.router.post('/user/saveUser', requireLogin, isAdmin, this.saveUser.bind(this))
    this.router.post('/user/updateUser', requireLogin, isAdmin, this.updateUser.bind(this))
    this.router.post('/user/deleteUser', requireLogin, isAdmin, this.deleteUser.bind(this))
  }

  async handler (request: IRequest, response: IResponse): Promise<IResponse> {
    throw new Error('Method not implemented.')
  }

  async getUser (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const key = req.body.key
      const value = req.body.value

      if (!key || !value) {
        return BadRequestResponse.handler(res, 'No values provided.')
      }

      const user = await this._userService.getUserService.handler(key, value)

      return SuccessResponse.handler(res, JSON.stringify(user))
    } catch (error) {
      console.log('[CONTROLLER - GET USER]: Error on get user, error is :', error)
      return InternalServerErrorResponse.handler(res, 'Unable to get the user due to an internal server problem.')
    }
  }

  async saveUser (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const userRaw = req.body.user

      if (!userRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const user = await this._userService.saveUserService.handler(userRaw)

      return SuccessResponse.handler(res, JSON.stringify(user))
    } catch (error) {
      console.log('[CONTROLLER - SAVE USER]: Error on save user, error is :', error)
      return InternalServerErrorResponse.handler(res, 'Unable to save the user due to an internal server problem.')
    }
  }

  async updateUser (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const userRaw = req.body.user

      if (!userRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const user = await this._userService.updateUserService.handler(userRaw)

      return SuccessResponse.handler(res, JSON.stringify(user))
    } catch (error) {
      console.log('[CONTROLLER - UPDATE USER]: Error on update user, error is :', error)
      return InternalServerErrorResponse.handler(res, 'Unable to update the user due to an internal server problem.')
    }
  }

  async deleteUser (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = req.body.id

      if (!id) {
        return BadRequestResponse.handler(res, 'No id provided.')
      }

      const user = await this._userService.deleteService.handler(id)

      return SuccessResponse.handler(res, JSON.stringify(user))
    } catch (error) {
      console.log('[CONTROLLER - DELETE USER]: Error on delete user, error is :', error)
      return InternalServerErrorResponse.handler(res, 'Unable to delete the user due to an internal server problem.')
    }
  }
}
