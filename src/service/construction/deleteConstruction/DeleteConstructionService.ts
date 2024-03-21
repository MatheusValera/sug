import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { EStatus } from '../../../domain/data/entity/ISchedule'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { EOptions } from '../../../domain/service/allocation/getAllocation/IGetAllocationService'
import { IDeleteConstructionService } from '../../../domain/service/construction/deleteConstruction/IDeleteConstructionService'
import { IAllocationService } from '../../allocation/AllocationServiceFactory'

export class DeleteConstructionService implements IDeleteConstructionService {
  constructor (private readonly _constructionRepository: IConstructionRepository,
    private readonly _allocationService: IAllocationService) {}

  async handler (id: number): Promise<IConstruction|Error> {
    if (!id) {
      throw new Error('No id provided')
    }

    const allocationsToConstruction = await this._allocationService.getAllocationService.handler(id, EOptions.BY_CONSTRUCTION) as IAllocation[]

    const hasAllocationActive = allocationsToConstruction.some(a => a.status === EStatus.active)

    if (hasAllocationActive) {
      return new Error('Construção possui alocações ativas')
    }

    const constructionDeleted = await this._constructionRepository.deleteConstruction(id)

    return constructionDeleted
  }
}
