import express from 'express'
import { IRequest } from '../../common/IRequest'
import { isAdmin } from '../../middleware/IsAdmin'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { requireLogin } from '../../middleware/RequireLogin'
import { SuccessResponse } from '../../common/responses/SuccessResponse'
import { BadRequestResponse } from '../../common/responses/BadRequestResponse'
import { IScheduleService } from '../../../service/schedule/ScheduleServiceFactory'
import { InternalServerErrorResponse } from '../../common/responses/InternalServerErrorResponse'

export class ScheduleController implements IController {
  public router = express.Router()

  constructor (private readonly _scheduleService: IScheduleService) {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/schedule', requireLogin, isAdmin, this.handler.bind(this))
    this.router.post('/schedule/getSchedule', requireLogin, this.getSchedule.bind(this))
    this.router.post('/schedule/getSchedules', requireLogin, this.getSchedules.bind(this))
    this.router.post('/schedule/saveSchedule', requireLogin, isAdmin, this.saveSchedule.bind(this))
    this.router.post('/schedule/updateSchedule', requireLogin, isAdmin, this.updateSchedule.bind(this))
    this.router.post('/schedule/deleteSchedule', requireLogin, isAdmin, this.deleteSchedule.bind(this))
  }

  async handler (request: IRequest, response: IResponse): Promise<any> {
    const schedules = await this._scheduleService.getSchedulesService.handler()
    response.status(200).render('./schedule.pug', { schedules })
  }

  async getSchedule (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)
      const option = req.body.option

      if (!id) {
        return BadRequestResponse.handler(res, 'No values provided.')
      }

      const schedule = await this._scheduleService.getScheduleService.handler(id, option)

      return SuccessResponse.handler(res, JSON.stringify(schedule))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async getSchedules (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const schedule = await this._scheduleService.getSchedulesService.handler()

      return SuccessResponse.handler(res, JSON.stringify(schedule))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async saveSchedule (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const scheduleRaw = req.body

      if (!scheduleRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const schedule = await this._scheduleService.saveScheduleService.handler(scheduleRaw)

      return SuccessResponse.handler(res, JSON.stringify(schedule))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async updateSchedule (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const scheduleRaw = req.body

      if (!scheduleRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const schedule = await this._scheduleService.updateScheduleService.handler(scheduleRaw)

      return SuccessResponse.handler(res, JSON.stringify(schedule))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async deleteSchedule (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)

      if (!id) {
        return BadRequestResponse.handler(res, 'No id provided.')
      }

      const schedule = await this._scheduleService.deleteScheduleService.handler(id)

      return SuccessResponse.handler(res, JSON.stringify(schedule))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }
}
