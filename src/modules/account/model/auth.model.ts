import { Request, Response, NextFunction } from 'express'
import { IAuthModel } from '../Iauth'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { SqliteQuery } from '../../../helper/DBHelper/IQueryObj'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqliteHelper(dbPath)

class AuthModel implements IAuthModel {
  async login(req: Request) {
    const q1 = new SqliteQuery()
    q1.sql = "SELECT * from user WHERE email = $email"
    q1.query = req.body
    const userRes = await sqliteHelper.findOne(q1)
    if(userRes.data.data === undefined) {
      // no user find
    } else {
      // get jwt
    }


  }
  logout(req: Request) {
    
  }
}