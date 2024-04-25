import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { EStatus } from '../../../domain/data/entity/ISchedule'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { ISaveAllocationService } from '../../../domain/service/allocation/saveAllocation/ISaveAllocationService'
import { Validation } from '../../../domain/utils/validator'
import { EmailService } from '../../../utils/sendEmail'
import { IScheduleService } from '../../schedule/ScheduleServiceFactory'

export class SaveAllocationService implements ISaveAllocationService {
  constructor (
    private readonly _validator: Validation,
    private readonly _userRepository: IUserRepository,
    private readonly _allocationRepository: IAllocationRepository,
    private readonly _constructionRepository: IConstructionRepository,
    private readonly _scheduleService: IScheduleService) {}

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

    allocation.createdAt = new Date()

    const user = await this._userRepository.getUser('id', allocation.userId)
    const construction = await this._constructionRepository.getConstruction('id', allocation.constructionId)

    let generateSchedulesToEngineer = []

    if (user.office === 'Engenheiro') {
      const allocationToConstruction = await this._allocationRepository.getAllocationByConstructionId(allocation.constructionId)
      const hasEngineer = allocationToConstruction.some(async (x) => {
        const userA = await this._userRepository.getUser('id', x.userId)
        if (userA.office === 'Engenheiro') {
          return true
        }
        return false
      })

      if (hasEngineer) {
        throw new Error('Já existe um engenheiro para essa construção')
      }

      generateSchedulesToEngineer = getLastDaysOfMonth(allocation.createdAt, construction.endDate)
    }

    const result = await this._allocationRepository.insertAllocation(allocation)

    if (result) {
      await EmailService.sendEmail(
        user.email,
        user.name,
        construction.name,
        'uma alocação',
        result.createdAt?.toLocaleString('pt-Br').split(',')[0],
        'Você tem uma nova alocação!',
        'Venha ver...'
      )

      if (generateSchedulesToEngineer.length) {
        for (const schedule of generateSchedulesToEngineer) {
          await this._scheduleService.saveScheduleService.handler({
            userId: user.id,
            createdAt: new Date(),
            dateSchedule: schedule,
            allocationId: result.id,
            constructionId: construction.id,
            status: 'active'
          })
        }
      }
    }

    return result
  }
}

function getLastDaysOfMonth (startDate, endDate): any[] {
  const dates = []
  const currentDate = new Date(startDate)

  // eslint-disable-next-line no-unmodified-loop-condition
  while (currentDate <= endDate) {
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    if (lastDayOfMonth > endDate) {
      dates.push(endDate)
    } else {
      dates.push(lastDayOfMonth)
    }

    currentDate.setMonth(currentDate.getMonth() + 1)
  }

  if (currentDate > endDate) {
    dates.push(endDate)
  }

  return dates
}
