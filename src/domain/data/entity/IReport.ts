export interface IReport {
  readonly id: number
  readonly userId: number
  readonly createdAt: Date
  readonly scheduleId: number
  readonly description: string
  readonly constructionId: number
}
