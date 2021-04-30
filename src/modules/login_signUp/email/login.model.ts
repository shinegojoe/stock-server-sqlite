import { createHmac, timingSafeEqual } from 'crypto'
import { NextFunction, Request} from 'express'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { SqliteQuery } from '../../../helper/DBHelper/IQueryObj'
import { generateJWT, verifyJWT } from '../../../helper/jwtHelper/jwtHelper'
import { LoginReq, LogInResp } from '../../../IAPI/ILogin'



const secret = process.env['SECRET'] as string


class EmailLoginModel {
  sqliteHelper: SqliteHelper
  constructor(sqliteHelper: SqliteHelper) {
    this.sqliteHelper = sqliteHelper

  }

  checkValid(hash1: string, hash2: string): boolean {
    const computedSignatureBuffer = Buffer.from(hash1, 'hex')
    const retrievedSignatureBuffer = Buffer.from(hash2, 'hex')
    const valid = timingSafeEqual(computedSignatureBuffer, retrievedSignatureBuffer)
    // console.log(valid)
    return valid
  }

  generatePwd(email: string) {
    const hash = createHmac('sha256', secret)
               .update(email)
               .digest('hex')
    return hash
  }


  async login(req: Request) {
    const body = req.body as LoginReq
    const q = new SqliteQuery()
    q.sql = 'SELECT * from user WHERE email = $email'
    q.query = body
    const res = await this.sqliteHelper.findOne(q)
    // const password = req.body.password as string
    // const email = req.body.email as string
    // const [password, email, name] = req.body
    const hash = this.generatePwd(body.password)
    const isValid = this.checkValid(hash, res.password)
    if(isValid) {
      const jwt = generateJWT({
        password: body.password,
        email: body.email
      })

      const data: LogInResp = {
        id: res.id,
        email: res.email,
        name: res.name,
        jwt
      }
      return data
    }
    throw Error('login failed')
  }

  async logout(req: Request) {
    return {}
  }
}





export { EmailLoginModel }
