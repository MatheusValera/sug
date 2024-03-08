import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { IGetConstructionService } from '../../../domain/service/construction/getConstruction/IGetConstructionService'

export class GetConstructionService implements IGetConstructionService {
  constructor (private readonly _constructionRepository: IConstructionRepository) {}

  async handler (id: number): Promise<IConstruction|Error> {
    if (!id) {
      return new Error('No id provided')
    }

    const construction = await this._constructionRepository.getConstruction(id)

    return construction
  }
}
