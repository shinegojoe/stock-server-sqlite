import { Request, Response, NextFunction } from 'express'

interface IAuthController {
  login(req: Request, res: Response, next: NextFunction): void
  logout(req: Request, res: Response, next: NextFunction): void
}

interface IAuthModel {
  login(req: Request): any
  logout(req: Request): any
}

export { IAuthController, IAuthModel }