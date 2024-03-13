import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeScheduleValidation } from '../ScheduleValidation'
import { UpdateScheduleService } from './UpdateScheduleService'
import { IUpdateScheduleService } from '../../../domain/service/schedule/updateSchedule/IUpdateScheduleService'
import { PrismaSchedulesRepository } from '../../../data/repository/schedules/SchedulesRepository'

interface FactoryTypes {
  updateScheduleService: IUpdateScheduleService
}

export const makeUpdateScheduleService = (): FactoryTypes => {
  const validator = makeScheduleValidation()
  const repository = new PrismaSchedulesRepository(prismaClient.getClient())

  const updateScheduleService = new UpdateScheduleService(repository, validator)

  return { updateScheduleService }
}
