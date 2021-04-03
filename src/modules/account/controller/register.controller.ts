import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'

import { IRegisterController, IRegisterModel} from '../Iaccount'
import model from '../model/register.model'
import RespLayer from '../../../responseLayer/sqlite.layer'

class RegisterController implements IRegisterController {
  model: IRegisterModel
  respLayer: RespLayer
  constructor(model: IRegisterModel, respLayer: RespLayer) {
    this.model = model
    this.respLayer = respLayer
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      let resp = await this.model.register(req)
      resp = this.respLayer.add(resp)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }
    
  }
}

const respLayer = new RespLayer("user")

const controller = new RegisterController(model, respLayer)

export default controller

