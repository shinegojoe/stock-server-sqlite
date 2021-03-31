import SqlLiteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { BaseSqliteModel, ISqlConfig } from '../../../model/base.model'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqlLiteHelper(dbPath)

const sqlConfig: ISqlConfig = {
  add: 'INSERT or IGNORE INTO role(name) VALUES ($name)',
  get: 'SELECT * from role WHERE id = $id',
  list: 'SELECT * from role',
  update: 'UPDATE role SET name = $name WHERE id = $id',
  del: 'DELETE from role WHERE id = $id',
  tableName: 'role'
}
const model = new BaseSqliteModel(sqliteHelper, sqlConfig)

export default model
