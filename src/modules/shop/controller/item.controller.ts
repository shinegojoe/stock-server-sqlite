import itemModel from '../model/item.model'
import { BaseController } from '../../../controller/base.controller'
import SqliteLayer from '../../../responseLayer/sqlite.layer'
import { BaseSqliteModel } from '../../../model/base.model'


const respLayer = new SqliteLayer('item')

class ItemController extends BaseController {
  constructor(model: BaseSqliteModel, respLayer: SqliteLayer) {
    super(model, respLayer)
  }
}

const itemController = new ItemController(itemModel, respLayer)

export default itemController