import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { IDeleteConstructionService } from '../../../domain/service/construction/deleteConstruction/IDeleteConstructionService'

export class DeleteConstructionService implements IDeleteConstructionService {
  constructor (private readonly _constructionRepository: IConstructionRepository) {}

  async handler (id: number): Promise<IConstruction|Error> {
    if (!id) {
      return new Error('No id provided')
    }

    const constructionDeleted = await this._constructionRepository.deleteConstruction(id)

    return constructionDeleted
  }
}
