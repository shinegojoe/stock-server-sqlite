import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
// import ResponseLayer from '../loginResplayer'
import { BaseResp } from '../../../responseLayer/base.layer'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { EmailLoginModel } from './login.model'


const dbPath = process.env['SQLITE_PATH'] as string
const sqliteHelper = new SqliteHelper(dbPath)
const model = new EmailLoginModel(sqliteHelper)
const respLayer = new BaseResp()


class EmailLoginController {
  model: EmailLoginModel
  respLayer: BaseResp
  constructor(model: EmailLoginModel, respLayer: BaseResp) {
    this.model = model
    this.respLayer = respLayer
  }

  async login(req: Request, res: Response, next: NextFunction) {
    console.log('login')
    try {
      // const data = await this.model.login(req)
      const data = {}
      const resp = this.respLayer.resp(data)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      console.log('lll err')
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