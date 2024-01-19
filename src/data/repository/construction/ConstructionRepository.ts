import { PrismaClient } from '@prisma/client'
import { IConstruction } from '../../../domain/data/entity/IConstruction'

export class PrismaConstructionRepository {
  constructor (private readonly _prismaClient: PrismaClient) {}

  async insertConstruction (constructionData: IConstruction): Promise<IConstruction> {
    const construction = await this._prismaClient.construction.create({
      data: constructionData
    })

    const register = construction

    return register
  }

  async updateConstruction (constructionToUpdate: IConstruction): Promise<IConstruction> {
    const { id, ...data } = constructionToUpdate

    const construction = await this._prismaClient.construction.update({
      data,
      where: { id }
    })

    const register = construction

    return register
  }

  async getConstruction (constructionId: number): Promise<IConstruction | null> {
    const register = this._prismaClient.construction.findUnique({
      where: { id: constructionId }
    })

    return register
  }

  async getConstructions (): Promise<IConstruction[]> {
    const register = this._prismaClient.construction.findMany({})
    return register
  }

  async deleteConstruction (constructionId: number): Promise<IConstruction> {
    const construction = await this.getConstruction(constructionId)

    if (!construction) {
      throw new Error('[ENTITY - CONSTRUCTION]: Construção não encontrada')
    }

    await this._prismaClient.construction.delete({
      where: { id: constructionId }
    })

    return construction
  }
}
