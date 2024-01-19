import { PrismaClient } from '@prisma/client'
import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'

export class PrismaAllocationRepository implements IAllocationRepository {
  constructor (readonly _prismaClient: PrismaClient) {}

  async insertAllocation (allocationData: IAllocation): Promise<IAllocation> {
    const allocation = await this._prismaClient.allocation.create({
      data: allocationData
    })

    return allocation
  }

  async updateAllocation (allocationToUpdate: IAllocation): Promise<IAllocation> {
    const { id, ...data } = allocationToUpdate

    const allocation = await this._prismaClient.allocation.update({
      data,
      where: { id }
    })

    return allocation
  }

  async getAllocation (allocationId: number): Promise<IAllocation | null> {
    return this._prismaClient.allocation.findUnique({
      where: { id: allocationId }
    })
  }

  async getAllocations (): Promise<IAllocation[] | null> {
    return this._prismaClient.allocation.findMany({ })
  }

  async getAllocationByUserId (userId: number): Promise<IAllocation[]> {
    return this._prismaClient.allocation.findMany({
      where: { userId }
    })
  }

  async getAllocationByConstructionId (constructionId: number): Promise<IAllocation[]> {
    return this._prismaClient.allocation.findMany({
      where: { constructionId }
    })
  }

  async deleteAllocation (allocationId: number): Promise<IAllocation> {
    const allocation = await this.getAllocation(allocationId)

    if (!allocation) {
      throw new Error('[ENTITY - ALLOCATION]: Alocação não encontrada')
    }

    await this._prismaClient.allocation.delete({
      where: { id: allocationId }
    })

    return allocation
  }
}
