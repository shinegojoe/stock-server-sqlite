import SqliteLayer from '../../../responseLayer/sqlite.layer'
import model from '../model/userRole.model'
import { BaseController } from '../../../controller/base.controller'
import { BaseSqliteModel, IBaseModel } from '../../../model/base.model'
import { IQueryResult, QueryResult } from '../../../helper/DBHelper/IQueryObj'


class UserRoleLayer extends SqliteLayer {
  constructor(name: string) {
    super(name)
  }
  add(data: IQueryResult) {
    console.log('data', data)
    if(data.data.tag !== undefined) {
      const queryRes = new QueryResult({
        message: `the ${this.name} is exist`
      })
      return queryRes
    }
    return data
  }
}

class UserRoleController extends BaseController {
  constructor(model: IBaseModel, respLayer: SqliteLayer) {
    super(model, respLayer)
  }
}

const respLayer = new UserRoleLayer('userRole')

const userRoleController = new UserRoleController(model, respLayer)

export default userRoleController