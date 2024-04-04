import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { UpdateScheduleService } from './UpdateScheduleService'
import { IUpdateScheduleService } from '../../../domain/service/schedule/updateSchedule/IUpdateScheduleService'
import { PrismaSchedulesRepository } from '../../../data/repository/schedules/SchedulesRepository'
import { Validation } from '../../../domain/utils/validator'

interface FactoryTypes {
  updateScheduleService: IUpdateScheduleService
}

export const makeUpdateScheduleService = (validator: Validation): FactoryTypes => {
  const repository = new PrismaSchedulesRepository(prismaClient.getClient())

  const updateScheduleService = new UpdateScheduleService(repository, validator)

  return { updateScheduleService }
}
