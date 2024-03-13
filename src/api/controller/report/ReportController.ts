import express from 'express'
import { IRequest } from '../../common/IRequest'
import { isAdmin } from '../../middleware/IsAdmin'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { requireLogin } from '../../middleware/RequireLogin'
import { SuccessResponse } from '../../common/responses/SuccessResponse'
import { BadRequestResponse } from '../../common/responses/BadRequestResponse'
import { IReportService } from '../../../service/report/ReportServiceFactory'
import { InternalServerErrorResponse } from '../../common/responses/InternalServerErrorResponse'

export class ReportController implements IController {
  public router = express.Router()

  constructor (private readonly _reportService: IReportService) {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/report', requireLogin, isAdmin, this.handler.bind(this))
    this.router.post('/report/getReport', requireLogin, this.getReport.bind(this))
    this.router.post('/report/getReports', requireLogin, this.getReports.bind(this))
    this.router.post('/report/saveReport', requireLogin, isAdmin, this.saveReport.bind(this))
    this.router.post('/report/updateReport', requireLogin, isAdmin, this.updateReport.bind(this))
    this.router.post('/report/deleteReport', requireLogin, isAdmin, this.deleteReport.bind(this))
  }

  async handler (request: IRequest, response: IResponse): Promise<any> {
    const reports = await this._reportService.getReportsService.handler()
    response.status(200).render('./report.pug', { reports })
  }

  async getReport (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)
      const option = req.body.option

      if (!id) {
        return BadRequestResponse.handler(res, 'No values provided.')
      }

      const report = await this._reportService.getReportService.handler(id, option)

      return SuccessResponse.handler(res, JSON.stringify(report))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async getReports (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const report = await this._reportService.getReportsService.handler()

      return SuccessResponse.handler(res, JSON.stringify(report))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async saveReport (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const reportRaw = req.body

      if (!reportRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const report = await this._reportService.saveReportService.handler(reportRaw)

      return SuccessResponse.handler(res, JSON.stringify(report))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async updateReport (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const reportRaw = req.body

      if (!reportRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const report = await this._reportService.updateReportService.handler(reportRaw)

      return SuccessResponse.handler(res, JSON.stringify(report))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async deleteReport (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)

      if (!id) {
        return BadRequestResponse.handler(res, 'No id provided.')
      }

      const report = await this._reportService.deleteReportService.handler(id)

      return SuccessResponse.handler(res, JSON.stringify(report))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }
}
