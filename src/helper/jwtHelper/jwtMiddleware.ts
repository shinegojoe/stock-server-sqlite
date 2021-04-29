import { Request, Response, NextFunction } from 'express'
import { verifyJWT, Payload } from './jwtHelper'
import SqliteHelper from '../DBHelper/sqlliteHelper'
import { SqliteQuery } from '../DBHelper/IQueryObj'
import httpStatus from 'http-status'
import ServerResp from '../../responseLayer/serverResp'


const dbPath = process.env['SQLITE_PATH'] as string
const sqliteHelper = new SqliteHelper(dbPath)



const checkValid = async(email: string) => {
  const q = new SqliteQuery()
  q.sql = 'SELECT * from user WHERE email = $email'
  q.query = {email}
  const res = await sqliteHelper.findOne(q)
  // console.log('find', res)
  
  return res === undefined ? false : true
}

const authFailed = () => {
  const resp = new ServerResp({
    message: 'auth failed'
  }, 'err')
  return resp
}

export const jwtMiddleware = async(req: Request, res: Response, next: NextFunction)=> {
  
  let token = req.headers.authorization as string
  token = token.replace('Bearer ', '')
  // console.log('token', token)
  
  const payload = await verifyJWT(token)
  console.log(payload)
  if (payload.err === true) {
    const resp = authFailed()
    res.status(httpStatus.OK).json(resp)
    return
  }
  const isValid = await checkValid(payload.email as string)
  if(!isValid) {
    const resp = authFailed()
    res.status(httpStatus.OK).json(resp)
    return
  }
  next()

}