import { UpdateAllocationService } from './UpdateAllocationService'
import { IUpdateAllocationService } from '../../../domain/service/allocation/updateAllocation/IUpdateAllocationService'
import { makePrismaAllocation } from '../../../data/repository/allocation/AllocationRepositoryFactory'
import { Validation } from '../../../domain/utils/validator'
let updateAllocationService = null
interface FactoryTypes {
  updateAllocationService: IUpdateAllocationService
}

export const makeUpdateAllocationService = (validator: Validation): FactoryTypes => {
  const repository = makePrismaAllocation()

  updateAllocationService = new UpdateAllocationService(repository, validator)

  return { updateAllocationService }
}
