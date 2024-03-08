import { makeGetConstructionService } from './getConstruction/GetConstructionServiceFactory'
import { makeGetConstructionsService } from './getConstructions/GetConstructionServiceFactory'
import { makeSaveConstructionService } from './saveConstruction/SaveConstructionServiceFactory'
import { makeDeleteConstructionService } from './deleteConstruction/DeleteConstructionServiceFactory'
import { makeUpdateConstructionService } from './updateConstruction/UpdateConstructionServiceFactory'
import { IGetConstructionService } from '../../domain/service/construction/getConstruction/IGetConstructionService'
import { IGetConstructionsService } from '../../domain/service/construction/getConstructions/IGetConstructionsService'
import { ISaveConstructionService } from '../../domain/service/construction/saveConstruction/ISaveConstructionService'
import { IDeleteConstructionService } from '../../domain/service/construction/deleteConstruction/IDeleteConstructionService'
import { IUpdateConstructionService } from '../../domain/service/construction/updateConstruction/IUpdateConstructionService'

export interface IConstructionService {
  getConstructionService: IGetConstructionService
  getConstructionsService: IGetConstructionsService
  saveConstructionService: ISaveConstructionService
  updateConstructionService: IUpdateConstructionService
  deleteConstructionService: IDeleteConstructionService
}

export const makeConstructionService = (): IConstructionService => {
  const getConstructionService = makeGetConstructionService().getConstructionService
  const saveConstructionService = makeSaveConstructionService().saveConstructionService
  const updateConstructionService = makeUpdateConstructionService().updateConstructionService
  const deleteConstructionService = makeDeleteConstructionService().deleteConstructionService
  const getConstructionsService = makeGetConstructionsService().getConstructionsService

  return {
    getConstructionService,
    saveConstructionService,
    updateConstructionService,
    deleteConstructionService,
    getConstructionsService
  }
}
