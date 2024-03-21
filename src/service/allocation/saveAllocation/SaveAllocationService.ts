import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { EStatus } from '../../../domain/data/entity/ISchedule'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'
import { ISaveAllocationService } from '../../../domain/service/allocation/saveAllocation/ISaveAllocationService'
import { Validation } from '../../../domain/utils/validator'

export class SaveAllocationService implements ISaveAllocationService {
  constructor (
    private readonly _allocationRepository: IAllocationRepository,
    private readonly _validator: Validation) {}

  async handler (allocation: Omit<IAllocation, 'id'>): Promise<IAllocation|Error> {
    // @ts-expect-error
    if (allocation.id) {
      return new Error('A allocation who already has an ID cannot be saved.')
    }

    const hasIncorrectValue = await this._validator.validate(allocation)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const allocationsToUser = await this._allocationRepository.getAllocationByUserId(allocation.userId)

    const hasAllocationToUSerInConstruction = allocationsToUser.some(x => x.constructionId === allocation.constructionId && x.status === EStatus.active)

    if (hasAllocationToUSerInConstruction) {
      return new Error('Já existe uma alocação ativa para essa construção desse usuário')
    }

    const result = this._allocationRepository.insertAllocation(allocation)

    return result
  }
}
