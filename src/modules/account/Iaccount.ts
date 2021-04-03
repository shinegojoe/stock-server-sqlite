import { Request, Response, NextFunction } from 'express'

interface IAccountController {
  login(req: Request, res: Response, next: NextFunction): void
  logout(req: Request, res: Response, next: NextFunction): void
}

interface IAccountModel {
  login(req: Request): any
  logout(req: Request): any
}



interface IRegisterController {
  register(req: Request, res: Response, next: NextFunction): void
  // closeUser(req: Request, res: Response, next: NextFunction): void
  // openUser(req: Request, res: Response, next: NextFunction): void
  // findPassword()
}

interface IRegisterModel {
  register(req: Request): any
  // closeUser(req: Request): any
  // openUser(req: Request): any
  // findPassword
}

export { IAccountController, IAccountModel, IRegisterController, IRegisterModel }