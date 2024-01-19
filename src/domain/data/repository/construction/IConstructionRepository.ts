import { PrismaClient } from '@prisma/client'
import { IConstruction } from '../../entity/IConstruction'

export interface IConstructionRepository {
  readonly _prismaClient: PrismaClient
  getConstructions (): Promise<IConstruction[]>
  deleteConstruction (constructionId: number): Promise<IConstruction>
  getConstruction (constructionId: number): Promise<IConstruction | null>
  insertConstruction (constructionData: IConstruction): Promise<IConstruction>
  updateConstruction (constructionToUpdate: IConstruction): Promise<IConstruction>
}
