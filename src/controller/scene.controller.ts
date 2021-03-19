import httpStatus from 'http-status'
import sceneModel from '../model/scene.model'
import { Request, Response, NextFunction} from 'express'


const add = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('bbb', req.body)
    const data = sceneModel.add()
    res.status(httpStatus.OK).json(data)
  } catch(e) {
    // next(e)
    throw e
  }
}

export default { add }