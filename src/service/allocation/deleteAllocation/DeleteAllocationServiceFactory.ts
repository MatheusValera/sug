import { makePrismaAllocation } from '../../../data/repository/allocation/AllocationRepositoryFactory'
import { IDeleteAllocationService } from '../../../domain/service/allocation/deleteAllocation/IDeleteAllocationService'
import { DeleteAllocationService } from './DeleteAllocationService'

interface FactoryTypes {
  deleteAllocationService: IDeleteAllocationService
}

export const makeDeleteAllocationService = (): FactoryTypes => {
  const allocationRepository = makePrismaAllocation()

  const deleteAllocationService = new DeleteAllocationService(allocationRepository)

  return { deleteAllocationService }
}
