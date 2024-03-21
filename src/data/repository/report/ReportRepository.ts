import { PrismaClient } from '@prisma/client'
import { IReport } from '../../../domain/data/entity/IReport'
import { IReportRepository } from '../../../domain/data/repository/report/IReportRepository'

export class PrismaReportRepository implements IReportRepository {
  constructor (readonly _prismaClient: PrismaClient) {}

  async insertReport (reportData: Omit<IReport, 'id' | 'createdAt'>): Promise<IReport> {
    const report = await this._prismaClient.report.create({
      data: reportData
    })

    return report
  }

  async updateReport (reportToUpdate: IReport): Promise<IReport> {
    const { id, ...data } = reportToUpdate

    const report = await this._prismaClient.report.update({
      data,
      where: { id }
    })

    return report
  }

  async getReport (reportId: number): Promise<IReport | null> {
    return this._prismaClient.report.findUnique({
      where: { id: reportId }
    })
  }

  async getReports (): Promise<IReport[] | null> {
    return this._prismaClient.report.findMany({
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })
  }

  async getReportByUserId (userId: number): Promise<IReport[]> {
    return this._prismaClient.report.findMany({
      where: { userId }
    })
  }

  async getReportBySchedulesId (scheduleId: number): Promise<IReport[]> {
    return this._prismaClient.report.findMany({
      where: { scheduleId }
    })
  }

  async getReportByConstructionId (constructionId: number): Promise<IReport[]> {
    return this._prismaClient.report.findMany({
      where: { constructionId },
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })
  }

  async deleteReport (reportId: number): Promise<IReport> {
    const report = await this.getReport(reportId)

    if (!report) {
      throw new Error('[ENTITY - REPORT]: Relatório não encontrado')
    }

    await this._prismaClient.report.delete({
      where: { id: reportId }
    })

    return report
  }
}
