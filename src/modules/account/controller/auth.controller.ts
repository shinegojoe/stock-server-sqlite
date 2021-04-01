import { Request, Response, NextFunction } from 'express'
import { IAuthController, IAuthModel} from '../Iauth'

class AuthController implements IAuthController {
  model: IAuthModel
  constructor(model: IAuthModel) {
    this.model = model
  }
  login(req: Request, res: Response, next: NextFunction) {

  }

  logout(req: Request, res: Response, next: NextFunction) {

  }
}