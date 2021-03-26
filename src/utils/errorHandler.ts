import { Request, Response, NextFunction } from 'express';
import { fileLogger } from '../helper/loggerHelper'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('err inla', err.name)
  fileLogger.error(err.name);

  return res.status(201).json({message: err.message})
  // return res.status(201).json({message: err})


}

export default errorHandler