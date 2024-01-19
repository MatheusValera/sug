import { PrismaClient } from '@prisma/client'
import { IReport } from '../../entity/IReport'

export interface IReportRepository {
  readonly _prismaClient: PrismaClient
  deleteReport(reportId: number): Promise<IReport>
  insertReport(reportData: IReport): Promise<IReport>
  getReport(reportId: number): Promise<IReport | null>
  getReportByUserId(userId: number): Promise<IReport[]>
  updateReport(reportToUpdate: IReport): Promise<IReport>
  getReportBySchedulesId(schedulesId: number): Promise<IReport[]>
  getReportByConstructionId(constructionId: number): Promise<IReport[]>
}
