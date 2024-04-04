import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaReportRepository } from '../../../data/repository/report/ReportRepository'
import { ISaveReportService } from '../../../domain/service/report/saveReport/ISaveReportService'
import { SaveReportService } from './SaveReportService'
import { PrismaSchedulesRepository } from '../../../data/repository/schedules/SchedulesRepository'
import { PrismaAllocationRepository } from '../../../data/repository/allocation/AllocationRepository'
import { Validation } from '../../../domain/utils/validator'

interface FactoryTypes {
  saveReportService: ISaveReportService
}

export const makeSaveReportService = (validator: Validation): FactoryTypes => {
  const repository = new PrismaReportRepository(prismaClient.getClient())
  const scheduleRepository = new PrismaSchedulesRepository(prismaClient.getClient())
  const allocationRepository = new PrismaAllocationRepository(prismaClient.getClient())

  const saveReportService = new SaveReportService(repository, validator, scheduleRepository, allocationRepository)

  return { saveReportService }
}
