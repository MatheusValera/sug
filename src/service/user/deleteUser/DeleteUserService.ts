import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { EStatus, ISchedule } from '../../../domain/data/entity/ISchedule'
import { IUser } from '../../../domain/data/entity/IUser'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { EOptions } from '../../../domain/service/allocation/getAllocation/IGetAllocationService'
import { IDeleteUserService } from '../../../domain/service/user/deleteUser/IDeleteUserService'
import { makeGetAllocationService } from '../../allocation/getAllocation/GetAllocationServiceFactory'
import { makeGetScheduleService } from '../../schedule/getSchedule/GetScheduleServiceFactory'

export class DeleteUserService implements IDeleteUserService {
  constructor (private readonly _userRepository: IUserRepository) {}

  async handler (id: number): Promise<IUser|Error> {
    if (!id) {
      return new Error('No id provided')
    }

    const allocationService = makeGetAllocationService()

    const hasAllocations = await allocationService.getAllocationService.handler(id, EOptions.BY_USER) as IAllocation[]
    const hasAllocationsActive = hasAllocations.some(allocation => allocation.status === EStatus.active)

    if (hasAllocationsActive) {
      return new Error('User has allocations active')
    }

    const schedulesService = makeGetScheduleService()

    const hasSchedule = await schedulesService.getScheduleService.handler(id, EOptions.BY_USER) as ISchedule[]
    const hasSchedulesActive = hasSchedule.some(schedule => schedule.status === EStatus.active)

    if (hasSchedulesActive) {
      return new Error('User has schedule active')
    }

    const userDeleted = await this._userRepository.deleteUser(id)

    return userDeleted
  }
}
