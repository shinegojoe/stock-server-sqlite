import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import ResponseLayer from '../loginResplayer'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { EmailLoginModel } from './login.model'


const dbPath = process.env['SQLITE_PATH'] as string
const sqliteHelper = new SqliteHelper(dbPath)
const model = new EmailLoginModel(sqliteHelper)
const respLayer = new ResponseLayer()


class EmailLoginController {
  model: EmailLoginModel
  respLayer: ResponseLayer
  constructor(model: EmailLoginModel, respLayer: ResponseLayer) {
    this.model = model
    this.respLayer = respLayer
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('xxx')
      const data = await this.model.login(req)
      const resp = this.respLayer.login(data)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }
  }
  async test(req: Request, res: Response, next: NextFunction) {
    const data = await this.model.loginTest(req)
    res.status(httpStatus.OK).json({xx: data})
  }
}

const controller = new EmailLoginController(model, respLayer)
export default controller