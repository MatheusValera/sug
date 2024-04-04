import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { EStatus } from '../../../domain/data/entity/ISchedule'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { ISaveAllocationService } from '../../../domain/service/allocation/saveAllocation/ISaveAllocationService'
import { Validation } from '../../../domain/utils/validator'
import { EmailService } from '../../../utils/sendEmail'

export class SaveAllocationService implements ISaveAllocationService {
  constructor (
    private readonly _validator: Validation,
    private readonly _userRepository: IUserRepository,
    private readonly _allocationRepository: IAllocationRepository,
    private readonly _constructionRepository: IConstructionRepository) {}

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

    const result = await this._allocationRepository.insertAllocation(allocation)

    if (result) {
      const user = await this._userRepository.getUser('id', allocation.userId)
      const construction = await this._constructionRepository.getConstruction('id', allocation.constructionId)

      await EmailService.sendEmail(
        user.email,
        user.name,
        construction.name,
        'uma alocação',
        result.createdAt?.toLocaleString('pt-Br').split(',')[0],
        'Você tem uma nova alocação!',
        'Venha ver...'
      )
    }

    return result
  }
}
