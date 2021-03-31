import httpStatus from 'http-status'
import { Request, Response, NextFunction } from 'express'
import { IBaseModel} from '../model/base.model'
// import respLayer from '../responseLayer/sqlite.layer'
import SqliteLayer from '../responseLayer/sqlite.layer'


interface IBaseController {
  model: IBaseModel
  add(req: Request, res: Response, next: NextFunction): void
  list(req: Request, res: Response, next: NextFunction): void

}

class BaseController implements IBaseController {
  model: IBaseModel
  respLayer: SqliteLayer
  constructor(model: IBaseModel, respLayer: SqliteLayer) {
    this.model = model
    this.respLayer = respLayer
  }
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.add(req)
      const resp = this.respLayer.add(data)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }

  }
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const resp = await this.model.list(req)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.get(req)
      const resp = this.respLayer.get(data)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.update(req)
      res.status(httpStatus.OK).json(data)
    } catch(e) {
      next(e)
    }
  }

  async del(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.del(req)
      const resp = this.respLayer.del(data)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }
  }

}

export { IBaseController, BaseController }

