import express from 'express'
import { IRequest } from '../../common/IRequest'
import { isAdmin } from '../../middleware/IsAdmin'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { requireLogin } from '../../middleware/RequireLogin'
import { SuccessResponse } from '../../common/responses/SuccessResponse'
import { BadRequestResponse } from '../../common/responses/BadRequestResponse'
import { IConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { InternalServerErrorResponse } from '../../common/responses/InternalServerErrorResponse'

export class ConstructionController implements IController {
  public router = express.Router()

  constructor (private readonly _constructionService: IConstructionService) {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/construction', requireLogin, isAdmin, this.handler.bind(this))
    this.router.post('/construction/getConstruction', requireLogin, isAdmin, this.getConstruction.bind(this))
    this.router.post('/construction/saveConstruction', requireLogin, isAdmin, this.saveConstruction.bind(this))
    this.router.post('/construction/updateConstruction', requireLogin, isAdmin, this.updateConstruction.bind(this))
    this.router.post('/construction/deleteConstruction', requireLogin, isAdmin, this.deleteConstruction.bind(this))
  }

  async handler (request: IRequest, response: IResponse): Promise<any> {
    const constructions = await this._constructionService.getUsersService.handler()
    response.status(200).render('./construction.pug', { constructions })
  }

  async getConstruction (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const key = req.body.key
      const value = req.body.value

      if (!key || !value) {
        return BadRequestResponse.handler(res, 'No values provided.')
      }

      const construction = await this._constructionService.getConstructionService.handler(key, value)

      return SuccessResponse.handler(res, JSON.stringify(construction))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async saveConstruction (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const constructionRaw = req.body

      if (!constructionRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const construction = await this._constructionService.saveConstructionService.handler(constructionRaw)

      return SuccessResponse.handler(res, JSON.stringify(construction))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async updateConstruction (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const constructionRaw = req.body

      if (!constructionRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const construction = await this._constructionService.updateConstructionService.handler(constructionRaw)

      return SuccessResponse.handler(res, JSON.stringify(construction))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async deleteConstruction (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)

      if (!id) {
        return BadRequestResponse.handler(res, 'No id provided.')
      }

      const construction = await this._constructionService.deleteConstructionService.handler(id)

      return SuccessResponse.handler(res, JSON.stringify(construction))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }
}
