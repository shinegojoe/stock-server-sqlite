import SqliteLayer from '../../../responseLayer/sqlite.layer'
import model from '../model/roleAuth.model'
import { BaseController } from '../../../controller/base.controller'
import { BaseSqliteModel } from '../../../model/base.model'
import { IQueryResult, QueryResult } from '../../../helper/DBHelper/IQueryObj'


class RoleAuthLayer extends SqliteLayer {
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
const respLayer = new RoleAuthLayer('roleAuth')

class RoleController extends BaseController{
  constructor(model: BaseSqliteModel, respLayer: SqliteLayer) {
    super(model, respLayer)
  }
}
const roleAuthController = new RoleController(model, respLayer)


export default roleAuthController