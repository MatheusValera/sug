import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { ISaveScheduleService } from '../../../domain/service/schedule/saveSchedule/ISaveScheduleService'
import { SaveScheduleService } from './SaveScheduleService'
import { makeScheduleValidation } from '../ScheduleValidation'
import { PrismaSchedulesRepository } from '../../../data/repository/schedules/SchedulesRepository'
import { makeConstructionService } from '../../construction/ConstructionServiceFactory'
import { makePrismaUserRepository } from '../../../data/repository/user/UserRepositoryFactory'

interface FactoryTypes {
  saveScheduleService: ISaveScheduleService
}

export const makeSaveScheduleService = (): FactoryTypes => {
  const validator = makeScheduleValidation()
  const repository = new PrismaSchedulesRepository(prismaClient.getClient())

  const userRepo = makePrismaUserRepository()
  const constructionService = makeConstructionService()

  const saveScheduleService = new SaveScheduleService(repository, validator, userRepo, constructionService)

  return { saveScheduleService }
}
