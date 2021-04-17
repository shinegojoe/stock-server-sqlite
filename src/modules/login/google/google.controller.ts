import { Request, Response, NextFunction} from 'express'
import model from './google.model'
import { ILoginUrl } from '../../../IAPI/ILogin'
import httpStatus from 'http-status'


class GoogleLoginController {

  login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginUrl = model.getLoginUrl()
      const resp: ILoginUrl = {
        loginUrl
      }
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }
  }

  async getToken(req: Request, res: Response, next: NextFunction) {
    try {
      const code = await model.getToken(req)
      res.redirect('http://localhost:3000')

      // res.status(httpStatus.OK).json({
      //   token: code
      // })

    } catch(e) {
        next(e)
    }
  }

}

const googleLoginController = new GoogleLoginController()
export default googleLoginController