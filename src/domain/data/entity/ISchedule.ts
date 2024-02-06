export interface ISchedule {
  readonly id: number
  readonly userId: number
  readonly createdAt: Date
  readonly updatedAt?: Date
  readonly dateSchedule: Date
  readonly allocationId: number
  readonly constructionId: number
}
