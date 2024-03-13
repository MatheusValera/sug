import express from 'express'
import { IRequest } from '../../common/IRequest'
import { isAdmin } from '../../middleware/IsAdmin'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { requireLogin } from '../../middleware/RequireLogin'
import { SuccessResponse } from '../../common/responses/SuccessResponse'
import { BadRequestResponse } from '../../common/responses/BadRequestResponse'
import { IAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { InternalServerErrorResponse } from '../../common/responses/InternalServerErrorResponse'

export class AllocationController implements IController {
  public router = express.Router()

  constructor (private readonly _allocationService: IAllocationService) {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/allocation', requireLogin, isAdmin, this.handler.bind(this))
    this.router.post('/allocation/getAllocation', requireLogin, this.getAllocation.bind(this))
    this.router.post('/allocation/getAllocations', requireLogin, this.getAllocations.bind(this))
    this.router.post('/allocation/saveAllocation', requireLogin, isAdmin, this.saveAllocation.bind(this))
    this.router.post('/allocation/updateAllocation', requireLogin, isAdmin, this.updateAllocation.bind(this))
    this.router.post('/allocation/deleteAllocation', requireLogin, isAdmin, this.deleteAllocation.bind(this))
  }

  async handler (request: IRequest, response: IResponse): Promise<any> {
    const allocations = await this._allocationService.getAllocationsService.handler()
    response.status(200).render('./allocation.pug', { allocations })
  }

  async getAllocation (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)
      const option = req.body.option

      if (!id) {
        return BadRequestResponse.handler(res, 'No values provided.')
      }

      const allocation = await this._allocationService.getAllocationService.handler(id, option)

      return SuccessResponse.handler(res, JSON.stringify(allocation))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async getAllocations (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const allocation = await this._allocationService.getAllocationsService.handler()

      return SuccessResponse.handler(res, JSON.stringify(allocation))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async saveAllocation (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const allocationRaw = req.body

      if (!allocationRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const allocation = await this._allocationService.saveAllocationService.handler(allocationRaw)

      return SuccessResponse.handler(res, JSON.stringify(allocation))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async updateAllocation (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const allocationRaw = req.body

      if (!allocationRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const allocation = await this._allocationService.updateAllocationService.handler(allocationRaw)

      return SuccessResponse.handler(res, JSON.stringify(allocation))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async deleteAllocation (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)

      if (!id) {
        return BadRequestResponse.handler(res, 'No id provided.')
      }

      const allocation = await this._allocationService.deleteAllocationService.handler(id)

      return SuccessResponse.handler(res, JSON.stringify(allocation))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }
}
