import { makeReportValidation } from '../ReportValidation'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaReportRepository } from '../../../data/repository/report/ReportRepository'
import { ISaveReportService } from '../../../domain/service/report/saveReport/ISaveReportService'
import { SaveReportService } from './SaveReportService'

interface FactoryTypes {
  saveReportService: ISaveReportService
}

export const makeSaveReportService = (): FactoryTypes => {
  const validator = makeReportValidation()
  const repository = new PrismaReportRepository(prismaClient.getClient())

  const saveReportService = new SaveReportService(repository, validator)

  return { saveReportService }
}
