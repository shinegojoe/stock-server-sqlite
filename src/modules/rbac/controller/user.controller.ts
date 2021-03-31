import httpStatus from 'http-status'
import { Request, Response, NextFunction} from 'express'
import model from '../model/user.model'
import SqliteLayer from '../../../responseLayer/sqlite.layer'
import { BaseController } from '../../../controller/base.controller'
import { BaseSqliteModel } from '../../../model/base.model'


const respLayer = new SqliteLayer('user')

class UserController extends BaseController{
  constructor(model: BaseSqliteModel, respLayer: SqliteLayer) {
    super(model, respLayer)
  }
}
const userController = new UserController(model, respLayer)
// const add = async(req: Request, res: Response, next: NextFunction) => {
//   try {
//     const data = await model.add(req)
//     res.status(httpStatus.OK).json(data)
//   } catch(e) {
//     next(e)
//   }
// }

// const get = async(req: Request, res: Response, next: NextFunction) => {
//   try {
//     const data = await model.get(req)
//     // const resp = respLayer.get(data, 'user')
//     res.status(httpStatus.OK).json(data)
//   } catch(e) {
//     next(e)
//   }
// }

// const list = async(req: Request, res: Response, next: NextFunction) => {
//   try {
//     const data = await model.list(req)
//     res.status(httpStatus.OK).json(data)
//   } catch(e) {
//     next(e)
//   }
// }

// const update = async(req: Request, res: Response, next: NextFunction) => {
//   try {
//     const data = await model.update(req)
//     res.status(httpStatus.OK).json(data)
//   } catch(e) {
//     next(e)
//   }
// }

// const del = async(req: Request, res: Response, next: NextFunction) => {
//   try {
//     const data = await model.del(req)
//     // const resp = respLayer.del(data, 'user')
//     res.status(httpStatus.OK).json(data)
//   } catch(e) {
//     next(e)
//   }
// }

export default userController