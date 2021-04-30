import { Request, Response, NextFunction } from 'express'
import { verifyJWT, Payload } from './jwtHelper'
import { LoginReq } from '../../IAPI/ILogin'


const verifyEmail = (email: string, decoded: Payload): void => {
  if(email != decoded.email) {
    throw Error('verify failed')
  }
}

export const jwtMiddleware = async(req: Request, res: Response, next: NextFunction)=> {
  let token = req.headers.authorization as string
  token = token.replace('Bearer ', '')
  // console.log('token', token)
  const body = req.body as LoginReq
  try {
    const decoded = verifyJWT(token)
    console.log('decoded', decoded)
    verifyEmail(body.email, decoded)
    next()
  } catch(e) {
    next(e)
  }
}