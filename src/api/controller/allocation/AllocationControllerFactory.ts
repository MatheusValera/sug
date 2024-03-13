import { makeAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { AllocationController } from './AllocationController'

export const makeAllocationController = (): AllocationController => {
  const allocationService = makeAllocationService()
  return new AllocationController(allocationService)
}
