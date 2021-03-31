import SqliteLayer from '../../../responseLayer/sqlite.layer'
import model from '../model/role.model'
import { BaseController } from '../../../controller/base.controller'
import { BaseSqliteModel } from '../../../model/base.model'

const respLayer = new SqliteLayer('role')

class RoleController extends BaseController{
  constructor(model: BaseSqliteModel, respLayer: SqliteLayer) {
    super(model, respLayer)
  }
}
const roleController = new RoleController(model, respLayer)


export default roleController