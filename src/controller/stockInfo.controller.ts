import httpStatus from 'http-status'
import { Request, Response, NextFunction} from 'express'
import model from '../model/stockInfo.model'

const add = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await model.add(req, res, next)
    res.status(httpStatus.OK).json(data)
  } catch(e) {
    throw e
  }
}

const get = (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch(e) {
    throw e
  }
}

const list = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await model.list(req, res, next)
    // console.log('xx', data)
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

export default { add, get, list, del }