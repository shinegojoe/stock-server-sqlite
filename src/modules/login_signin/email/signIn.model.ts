import { createHmac, timingSafeEqual } from 'crypto'
import { Request } from 'express'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { SqliteQuery } from '../../../helper/DBHelper/IQueryObj'
import { generateJWT } from '../../../helper/jwtHelper/jwtHelper'

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

  isValid(hash1: string, hash2: string) {
    const computedSignatureBuffer = Buffer.from(hash1, 'hex')
    const retrievedSignatureBuffer = Buffer.from(hash2, 'hex')
    const valid = timingSafeEqual(computedSignatureBuffer, retrievedSignatureBuffer)
    console.log(valid)
  }

  async signIn(req: Request) {
    const password = req.body.password as string
    
    const hash = this.generatePwd(password)
    
    const q = new SqliteQuery()
    q.sql = 'INSERT or IGNORE INTO user(email, name, password) VALUES ($email, $name, $password)'
    q.insertData = req.body
    q.insertData.password = hash
    let data = await this.sqliteHelper.insertOne(q)
    if(data.changes !== 0) {
      // get token
      const id = data.lastInsertRowid
      const q2 = new SqliteQuery()
      q2.sql = 'SELECT * from user WHERE id = $id'
      q2.query = {id: id}
      const user = await this.sqliteHelper.findOne(q2)
      data = user
      const jwt = generateJWT(user)
      console.log('jwt', jwt)



    }
      
    
    return data
  }
}

const model = new EmailSignInModel(sqliteHelper)

export default model