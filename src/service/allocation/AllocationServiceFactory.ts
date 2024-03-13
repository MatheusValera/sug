import { makeGetAllocationService } from './getAllocation/GetAllocationServiceFactory'
import { makeGetAllocationsService } from './getAllocations/GetAllocationsServiceFactory'
import { makeSaveAllocationService } from './saveAllocation/SaveAllocationServiceFactory'
import { makeDeleteAllocationService } from './deleteAllocation/DeleteAllocationServiceFactory'
import { makeUpdateAllocationService } from './updateAllocation/UpdateAllocationServiceFactory'
import { IGetAllocationService } from '../../domain/service/allocation/getAllocation/IGetAllocationService'
import { IGetAllocationsService } from '../../domain/service/allocation/getAllocations/IGetAllocationsService'
import { ISaveAllocationService } from '../../domain/service/allocation/saveAllocation/ISaveAllocationService'
import { IDeleteAllocationService } from '../../domain/service/allocation/deleteAllocation/IDeleteAllocationService'
import { IUpdateAllocationService } from '../../domain/service/allocation/updateAllocation/IUpdateAllocationService'

export interface IAllocationService {
  getAllocationService: IGetAllocationService
  getAllocationsService: IGetAllocationsService
  saveAllocationService: ISaveAllocationService
  updateAllocationService: IUpdateAllocationService
  deleteAllocationService: IDeleteAllocationService
}

export const makeAllocationService = (): IAllocationService => {
  const getAllocationService = makeGetAllocationService().getAllocationService
  const saveAllocationService = makeSaveAllocationService().saveAllocationService
  const updateAllocationService = makeUpdateAllocationService().updateAllocationService
  const deleteAllocationService = makeDeleteAllocationService().deleteAllocationService
  const getAllocationsService = makeGetAllocationsService().getAllocationsService

  return {
    getAllocationService,
    saveAllocationService,
    updateAllocationService,
    deleteAllocationService,
    getAllocationsService
  }
}
