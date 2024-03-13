export enum EStatus {
  active = 'active',
  inactive = 'inactive'
}

export interface ISchedule {
  id: number
  userId: number
  createdAt: Date
  updatedAt?: Date
  dateSchedule: Date
  allocationId: number
  constructionId: number
  status: string
}
