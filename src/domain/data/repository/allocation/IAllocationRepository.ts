import { PrismaClient } from '@prisma/client'
import { IAllocation } from '../../entity/IAllocation'

export interface IAllocationRepository {
  readonly _prismaClient: PrismaClient
  getAllocations (): Promise<IAllocation[] | null>
  deleteAllocation (allocationId: number): Promise<IAllocation>
  getAllocationByUserId (userId: number): Promise<IAllocation[]>
  getAllocation (allocationId: number): Promise<IAllocation | null>
  insertAllocation (allocationData: IAllocation): Promise<IAllocation>
  updateAllocation (allocationToUpdate: IAllocation): Promise<IAllocation>
  getAllocationByConstructionId (constructionId: number): Promise<IAllocation[]>
}
