import httpStatus from 'http-status'
import { Request, Response, NextFunction} from 'express'
import model from '../model/role.model'
import respLayer from '../../../responseLayer/sqlite.layer'


const add = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await model.add(req)
    res.status(httpStatus.OK).json(data)
  } catch(e) {
    next(e)
  }
}

const get = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await model.get(req)
    const resp = respLayer.get(data, "role")
    res.status(httpStatus.OK).json(resp)
  } catch(e) {
    next(e)
  }
}

const list = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await model.list(req)
    res.status(httpStatus.OK).json(data)
  } catch(e) {
    next(e)
  }
}

const update = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await model.update(req)
    res.status(httpStatus.OK).json(data)
  } catch(e) {
    next(e)
  }
}

const del = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await model.del(req)
    const resp = respLayer.del(data, 'role')
    res.status(httpStatus.OK).json(resp)
  } catch(e) {
    next(e)
  }
}

export default { add, get, list, update, del }