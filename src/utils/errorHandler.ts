import { Request, Response, NextFunction } from 'express';
import { fileLogger } from '../helper/loggerHelper'
import { QueryResult } from '../helper/DBHelper/IQueryObj'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('err inla', err.name)
  fileLogger.error(err.name);
  const resp = new QueryResult({
    message: err.message
  })
  resp.status = 'error'

  return res.status(201).json(resp)
  // return res.status(201).json({message: err})


}

export default errorHandler