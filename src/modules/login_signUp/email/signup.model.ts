import { createHmac, timingSafeEqual } from 'crypto'
import { Request } from 'express'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { SqliteQuery } from '../../../helper/DBHelper/IQueryObj'
import { generateJWT } from '../../../helper/jwtHelper/jwtHelper'
import { SignUpReq, LogInResp } from '../../../IAPI/ILogin'

const dbPath: any = process.env['SQLITE_PATH']
const secret = process.env['SECRET'] as string
const sqliteHelper = new SqliteHelper(dbPath)

class EmailSignInModel {
  sqliteHelper: SqliteHelper
  constructor(sqliteHelper: SqliteHelper) {
    this.sqliteHelper = sqliteHelper
  }

  generatePwd(password: string) {
    const hash = createHmac('sha256', secret)
               .update(password)
               .digest('hex')
    console.log(hash)
    return hash
  }

  async signUp(req: Request):Promise<LogInResp> {
    const body: SignUpReq = req.body as SignUpReq
    body.name = ''
    const hash: string = this.generatePwd(body.password)
    
    const q = new SqliteQuery()
    q.sql = 'INSERT or IGNORE INTO user(email, name, password) VALUES ($email, $name, $password)'
    q.insertData = body
    q.insertData.password = hash
    const insetRes = await this.sqliteHelper.insertOne(q)
    console.log('insertRes', insetRes)
    
    if(insetRes.changes !== 0) {
      const jwt: string = generateJWT({
        email: body.email
      })
      console.log('jwt', jwt)
      const resp: LogInResp = {
        id: insetRes.lastInsertRowid,
        email: body.email,
        name: body.name,
        jwt: jwt
      }
      return resp
    }
    throw Error('user alread exist')
  }
}

const model = new EmailSignInModel(sqliteHelper)

export default model