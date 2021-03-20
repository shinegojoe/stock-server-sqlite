import { Response, Request, NextFunction } from 'express'
import httpStatus from 'http-status'
import model from '../model/stockList.model'

const add = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await model.add(req, res, next)
    res.status(httpStatus.OK).json(data)
  } catch(e) {
    throw e
  }
}

const list = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await model.list(req, res, next)
    res.status(httpStatus.OK).json(data)
  } catch(e) {
    throw e
  }
}

const del = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await model.del(req, res, next)
    res.status(httpStatus.OK).json(data)
  } catch(e) {
    throw e
  }
}

export default { add, list, del }