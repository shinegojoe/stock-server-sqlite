import SqliteLayer from '../../../responseLayer/sqlite.layer'
import { BaseController } from '../../../controller/base.controller'
import { BaseSqliteModel } from '../../../model/base.model'
import model from '../model/auth.model'


const respLayer = new SqliteLayer('auth')
class AuthController extends BaseController{
  constructor(model: BaseSqliteModel, respLayer: SqliteLayer) {
    super(model, respLayer)
  }
}

const authController = new AuthController(model, respLayer)

export default authController