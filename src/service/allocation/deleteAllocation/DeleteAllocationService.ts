import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'
import { IDeleteAllocationService } from '../../../domain/service/allocation/deleteAllocation/IDeleteAllocationService'

export class DeleteAllocationService implements IDeleteAllocationService {
  constructor (private readonly _allocationRepository: IAllocationRepository) {}

  async handler (id: number): Promise<IAllocation|Error> {
    if (!id) {
      throw new Error('No id provided')
    }

    const allocationDeleted = await this._allocationRepository.deleteAllocation(id)

    return allocationDeleted
  }
}
