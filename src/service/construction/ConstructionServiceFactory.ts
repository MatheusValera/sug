
export interface IConstructionService {
  getConstructionService: IGetConstructionService
  getUConstructionService: IGetConstructionsService
  saveConstructionService: ISaveConstructionService
  updateConstructionService: IUpdateConstructionService
  deleteConstructionService: IDeleteConstructionService
}

export const makeUserService = ():  => {
  const geConstructionService = makeGetConstructionService().geConstructionService
  const savConstructionService = makeSaveConstructionService().savConstructionService
  const updatConstructionService = makeUpdateConstructionService().updatConstructionService
  const dConstructionService = makeDeleteConstructionService().dConstructionService
  const getConstructionService = makeGetConstructionsService().getConstructionService

  return {
    geConstructionService,
    savConstructionService,
    updatConstructionService,
    dConstructionService,
    getConstructionService,
  }
}
