import { Request, Response, NextFunction} from 'express'
import httpStatus from 'http-status'
import model from '../model/logoInfo.model'
import SqliteLayer from '../../../responseLayer/sqlite.layer'

class LogoInfoController {
  respLayer: SqliteLayer
  constructor(respLayer: SqliteLayer) {
    this.respLayer = respLayer
  }
  async getLogoList(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await model.getLogoList(req)
      // console.log('xxx', resp)
      const resp = this.respLayer.list(data)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      console.log('logo error')
      next(e)
    }
    
  }
}

const respLayer = new SqliteLayer('logoInfo')
const controller  = new LogoInfoController(respLayer)

export default controller

