import { createHmac, timingSafeEqual } from 'crypto'
import { NextFunction, Request} from 'express'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { SqliteQuery } from '../../../helper/DBHelper/IQueryObj'
import { generateJWT, verifyJWT } from '../../../helper/jwtHelper/jwtHelper'



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
    let data: any = {}
    const q = new SqliteQuery()
    q.sql = 'SELECT * from user WHERE id = $id'
    q.query = req.body
    const res = await this.sqliteHelper.findOne(q)
    const password = req.body.password as string
    const email = req.body.email as string
    // const [password, email, name] = req.body
    const hash = this.generatePwd(password)
    const isValid = this.checkValid(hash, res.password)
    if(isValid) {
      const jwt = generateJWT({
        password,
        email
      })
      data = res
      data = {...res, isValid, jwt}
      // data.isValid = isValid
      // data.jwt = jwt
      delete data.password
      // console.log(data)
      const xx = verifyJWT(jwt)
      console.log('xx', xx)
      return data
    }
    return data.isValid = isValid
    
  }

  async loginTest(req: Request) {
   
    return "qq123"
    // let data: any = {}
    // const q = new SqliteQuery()
    // q.sql = 'SELECT * from user WHERE id = $id'
    // q.query = req.body
    // const res = await this.sqliteHelper.findOne(q)
    // const password = req.body.password as string
    // const email = req.body.email as string
    // // const [password, email, name] = req.body
    // const hash = this.generatePwd(password)
    // const isValid = this.checkValid(hash, res.password)
    // if(isValid) {
    //   const jwt = generateJWT({
    //     password,
    //     email
    //   })
    //   data = res
    //   data = {...res, isValid, jwt}
    //   // data.isValid = isValid
    //   // data.jwt = jwt
    //   delete data.password
    //   // console.log(data)
    //   const xx = verifyJWT(jwt)
    //   console.log('xx', xx)
    //   return data
    // }
    // return data.isValid = isValid
  }
}





export { EmailLoginModel }
