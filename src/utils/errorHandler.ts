import { Request, Response, NextFunction } from 'express';


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('err inla', err.name)
  return res.status(201).json({message: err.message})
  // return res.status(201).json({message: err})


}

export default errorHandler