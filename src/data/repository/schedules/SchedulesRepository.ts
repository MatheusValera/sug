import { PrismaClient } from '@prisma/client'
import { ISchedule } from '../../../domain/data/entity/ISchedule'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'

export class PrismaSchedulesRepository implements ISchedulesRepository {
  constructor (private readonly _prismaClient: PrismaClient) {}

  async insertSchedule (schedulesData: ISchedule): Promise<ISchedule> {
    const schedules = await this._prismaClient.schedules.create({
      data: schedulesData
    })

    return schedules
  }

  async updateSchedule (schedulesToUpdate: ISchedule): Promise<ISchedule> {
    const { id, ...data } = schedulesToUpdate

    const schedules = await this._prismaClient.schedules.update({
      data,
      where: { id }
    })

    return schedules
  }

  async getSchedule (schedulesId: number): Promise<ISchedule | null> {
    return this._prismaClient.schedules.findUnique({
      where: { id: schedulesId }
    })
  }

  async getSchedules (): Promise<ISchedule[] | null> {
    return this._prismaClient.schedules.findMany({ })
  }

  async getScheduleByUserId (userId: number): Promise<ISchedule[]> {
    return this._prismaClient.schedules.findMany({
      where: { userId }
    })
  }

  async getScheduleByConstructionId (constructionId: number): Promise<ISchedule[]> {
    return this._prismaClient.schedules.findMany({
      where: { constructionId }
    })
  }

  async getScheduleByAllocationId (allocationId: number): Promise<ISchedule[]> {
    return this._prismaClient.schedules.findMany({
      where: { allocationId }
    })
  }

  async deleteSchedule (schedulesId: number): Promise<ISchedule> {
    const schedules = await this.getSchedule(schedulesId)

    if (!schedules) {
      throw new Error('[ENTITY - SCHEDULES]: Agendamento não encontrado')
    }

    await this._prismaClient.schedules.delete({
      where: { id: schedulesId }
    })

    return schedules
  }
}
