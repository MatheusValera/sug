import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaReportRepository } from '../../../data/repository/report/ReportRepository'
import { ISaveReportService } from '../../../domain/service/report/saveReport/ISaveReportService'
import { SaveReportService } from './SaveReportService'
import { PrismaSchedulesRepository } from '../../../data/repository/schedules/SchedulesRepository'
import { Validation } from '../../../domain/utils/validator'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'
import { PrismaUserRepository } from '../../../data/repository/user/UserRepository'

interface FactoryTypes {
  saveReportService: ISaveReportService
}

export const makeSaveReportService = (validator: Validation): FactoryTypes => {
  const repository = new PrismaReportRepository(prismaClient.getClient())
  const scheduleRepository = new PrismaSchedulesRepository(prismaClient.getClient())
  const userRepository = new PrismaUserRepository(prismaClient.getClient())
  const constructionRepository = new PrismaConstructionRepository(prismaClient.getClient())

  const saveReportService = new SaveReportService(
    repository, validator,
    scheduleRepository,
    userRepository, constructionRepository)

  return { saveReportService }
}
