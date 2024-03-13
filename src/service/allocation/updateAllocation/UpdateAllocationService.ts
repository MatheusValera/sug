import { Validation } from '../../../domain/utils/validator'
import { IUpdateAllocationService } from '../../../domain/service/allocation/updateAllocation/IUpdateAllocationService'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'
import { IAllocation } from '../../../domain/data/entity/IAllocation'

export class UpdateAllocationService implements IUpdateAllocationService {
  constructor (
    private readonly _allocationRepository: IAllocationRepository,
    private readonly _validator: Validation) {}

  async handler (allocation: IAllocation): Promise<IAllocation|Error> {
    if (!allocation.id) {
      throw new Error('A allocation who already no has an ID cannot be saved.')
    }

    const hasIncorrectValue = await this._validator.validate(allocation)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const result = this._allocationRepository.updateAllocation(allocation)

    return result
  }
}
