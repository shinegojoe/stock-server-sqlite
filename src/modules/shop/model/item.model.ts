import { BaseSqliteModel, ISqlConfig } from '../../../model/base.model'
import SqlLiteHelper from '../../../helper/DBHelper/sqlliteHelper'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqlLiteHelper(dbPath)

const sqlConfig: ISqlConfig = {
  add: 'INSERT or IGNORE INTO item(uid, title, intro, imgUrl, price) VALUES ($uid, $title, $intro, $imgUrl, $price)',
  get: 'SELECT * from item WHERE id = $id',
  list: 'SELECT * from item',
  update: 'UPDATE item SET title = $title, intro = $intro, imgUrl=$imgUrl, price=$price WHERE id = $id',
  del: 'DELETE from item WHERE id = $id',
  tableName: 'item'
}

class ItemModel extends BaseSqliteModel {
  constructor(sqliteHelper: SqlLiteHelper, sqlConfig: ISqlConfig) {
    super(sqliteHelper, sqlConfig)
  }
}

const model = new ItemModel(sqliteHelper, sqlConfig)

export default model