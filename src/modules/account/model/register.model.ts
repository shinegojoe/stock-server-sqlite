import { Request } from 'express'
import { IRegisterModel } from '../Iaccount'
import { generateJWT } from '../../../helper/jwtHelper/jwtHelper'
import { QueryResult } from '../../../helper/DBHelper/IQueryObj'
import userModel from '../../rbac/model/user.model'

class RegisterModel implements IRegisterModel {
  async register(req: Request) {
    const addRes = await userModel.add(req)
    if(addRes.data.changes === 1) {
      const email = req.body.email
      const pwd = req.body.password
      const token = generateJWT({
        email,
        pwd
      })
      const res = new QueryResult({
        token
      })
      return res
    }
    return addRes
    

  }
}

const model = new RegisterModel()

export default model