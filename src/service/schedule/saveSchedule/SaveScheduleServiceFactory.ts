import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { ISaveScheduleService } from '../../../domain/service/schedule/saveSchedule/ISaveScheduleService'
import { SaveScheduleService } from './SaveScheduleService'
import { makeScheduleValidation } from '../ScheduleValidation'
import { PrismaSchedulesRepository } from '../../../data/repository/schedules/SchedulesRepository'

interface FactoryTypes {
  saveScheduleService: ISaveScheduleService
}

export const makeSaveScheduleService = (): FactoryTypes => {
  const validator = makeScheduleValidation()
  const repository = new PrismaSchedulesRepository(prismaClient.getClient())

  const saveScheduleService = new SaveScheduleService(repository, validator)

  return { saveScheduleService }
}
