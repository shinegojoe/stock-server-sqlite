import { Request, Response, NextFunction} from 'express'
import httpStatus from 'http-status'
import model from '../model/logoInfo.model'

class LogoInfoController {
  async getLogoList(req: Request, res: Response, next: NextFunction) {
    try {
      const resp = await model.getLogoList(req)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }
    
  }
}

const controller  = new LogoInfoController()

export default controller

