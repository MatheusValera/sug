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
import { IUserService } from '../../../service/user/UserServiceFactory'
import { IConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { IAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { IUser } from '../../../domain/data/entity/IUser'
import { ISchedule } from '../../../domain/data/entity/ISchedule'
import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { IAllocation } from '../../../domain/data/entity/IAllocation'

export class ScheduleController implements IController {
  public router = express.Router()

  constructor (private readonly _scheduleService: IScheduleService,
    private readonly _usersService: IUserService,
    private readonly _constructionService: IConstructionService,
    private readonly _allocationService: IAllocationService) {
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
    const schedulesRaw = await this._scheduleService.getSchedulesService.handler() as ISchedule[]
    const users = await this._usersService.getUsersService.handler() as IUser[]
    const constructions = await this._constructionService.getConstructionsService.handler() as IConstruction[]
    const allocations = await this._allocationService.getAllocationsService.handler() as IAllocation[]

    const schedules = schedulesRaw.map(s => {
      const user = users.filter(u => u.id === s.userId)[0]
      const construction = constructions.filter(c => c.id === s.constructionId)[0]
      const allocation = allocations.filter(a => a.id === s.allocationId)[0]

      return {
        ...s,
        construction: {
          name: construction.name
        },
        allocation: {
          createdAt: allocation.createdAt
        },
        user: {
          name: user.name
        }
      }
    })
    response.status(200).render('./schedule.pug', { schedules, users, constructions, allocations })
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
