import { Request, Response, NextFunction } from 'express'
import { IAccountController, IAccountModel} from '../Iaccount'
import accountModel from '../model/account.model'
import SqliteLayer from '../../../responseLayer/sqlite.layer'

class AccountController implements IAccountController {
  model: IAccountModel
  respLayer: SqliteLayer
  constructor(model: IAccountModel, respLayer: SqliteLayer) {
    this.model = model
    this.respLayer = respLayer
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      let resp = await this.model.login(req)
      resp = this.respLayer.get(resp)
      res.status(200).json(resp)
    } catch(e) {
      next(e)
    }
    
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      let resp = await this.model.logout(req)
      res.status(200).json(resp)

    } catch(e) {
      next(e)
    }
  }
}
const respLayer = new SqliteLayer('user')
const accountController = new AccountController(accountModel, respLayer)

export default accountController