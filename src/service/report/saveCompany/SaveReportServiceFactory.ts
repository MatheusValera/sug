import { makeReportValidation } from '../ReportValidation'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaReportRepository } from '../../../data/repository/report/ReportRepository'
import { ISaveReportService } from '../../../domain/service/report/saveReport/ISaveReportService'
import { SaveReportService } from './SaveReportService'
import { makeScheduleService } from '../../schedule/ScheduleServiceFactory'
import { makeAllocationService } from '../../allocation/AllocationServiceFactory'

interface FactoryTypes {
  saveReportService: ISaveReportService
}

export const makeSaveReportService = (): FactoryTypes => {
  const validator = makeReportValidation()
  const repository = new PrismaReportRepository(prismaClient.getClient())
  const scheduleService = makeScheduleService()
  const allocationService = makeAllocationService()

  const saveReportService = new SaveReportService(repository, validator, scheduleService, allocationService)

  return { saveReportService }
}
