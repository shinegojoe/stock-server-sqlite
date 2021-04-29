import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import signInModel from './signIn.model'
import ResponseLayer from '../../../responseLayer/sqlite.layer'


class EmailSignInController {
  
  respLayer: ResponseLayer
  constructor(respLayer: ResponseLayer) {
    this.respLayer = respLayer
  }
  async signIn(req: Request, res: Response, next: NextFunction) {
    const data = await signInModel.signIn(req)
    const resp = respLayer.add(data)
    res.status(httpStatus.OK).json(resp)
    
  }
}

const respLayer = new ResponseLayer('user')
const controller = new EmailSignInController(respLayer)

export default controller