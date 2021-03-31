import SqlLiteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { BaseSqliteModel, ISqlConfig } from '../../../model/base.model'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqlLiteHelper(dbPath)

const sqlConfig: ISqlConfig = {
  add: 'INSERT or IGNORE INTO auth(name) VALUES ($name)',
  get: 'SELECT * from auth WHERE id = $id',
  list: 'SELECT * from auth',
  update: 'UPDATE auth SET name = $name WHERE id = $id',
  del: 'DELETE from auth WHERE id = $id',
  tableName: 'auth'
}
const model = new BaseSqliteModel(sqliteHelper, sqlConfig)

export default model