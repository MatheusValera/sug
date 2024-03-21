import { IRequest } from '../common/IRequest'
import { IResponse } from '../common/IResponse'
import { INext } from '../common/INext'

export const isRuleCategory = (category: number, req: IRequest, res: IResponse, next: INext): void => {
  if (req.user.category <= category) {
    res.redirect('/')
    return
  }
  next()
}
