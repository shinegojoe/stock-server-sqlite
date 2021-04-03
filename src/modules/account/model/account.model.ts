import { Request, Response, NextFunction } from 'express'
import { IAccountModel } from '../Iaccount'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { SqliteQuery, QueryResult } from '../../../helper/DBHelper/IQueryObj'
import { generateJWT, verifyJWT } from '../../../helper/jwtHelper/jwtHelper'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqliteHelper(dbPath)

class AccountModel implements IAccountModel {
  async login(req: Request) {
    const q1 = new SqliteQuery()
    q1.sql = "SELECT * from user WHERE email = $email"
    q1.query = req.body
    const userRes = await sqliteHelper.findOne(q1)

    if(userRes.data === undefined) {
      // no user find
      return userRes
    } else {
      // get jwt
      // const email = userRes.data.email
      const password = userRes.data.password
      // const name = userRes.data.name
      delete userRes.data.password
      const token = generateJWT({
        email: userRes.data.email,
        password
      })
      userRes.data.token = token
      return userRes 
    }


  }
  logout(req: Request) {
    const token = req.body.token
    const res = verifyJWT(token)
    return new QueryResult({
      res: res
    })
  }
}

const model = new AccountModel()
export default model