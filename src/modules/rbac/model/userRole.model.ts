import { Request } from 'express'
import SqlLiteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { BaseSqliteModel, ISqlConfig } from '../../../model/base.model'
import { SqliteQuery } from '../../../helper/DBHelper/IQueryObj'


const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqlLiteHelper(dbPath)

const sqlConfig: ISqlConfig = {
  add: 'INSERT or IGNORE INTO userRole(uid, rid) VALUES ($uid, $rid)',
  get: 'SELECT * from userRole WHERE id = $id',
  list: 'SELECT * from userRole',
  update: 'UPDATE userRole SET uid = $uid, rid = $rid WHERE id = $id',
  del: 'DELETE from userRole WHERE id = $id',
  tableName: 'userRole'
}

class UserRoleModel extends BaseSqliteModel {
  constructor(sqliteHelper: SqlLiteHelper, sqlConfig: ISqlConfig) {
    super(sqliteHelper, sqlConfig)
  }
  
  async add(req: Request) {
    const findQ = new SqliteQuery()
    findQ.sql = 'SELECT * from userRole WHERE uid = $uid AND rid = $rid'
    findQ.query = req.body
    const findRes = await this.sqliteHelper.findOne(findQ)
    console.log('findRes', findRes)
    if(findRes.data !== undefined) {
      findRes.data.tag = "exist"
      return findRes
    }
    const q = new SqliteQuery()
    // q.sql = 'INSERT or IGNORE INTO role(name) VALUES ($name)'
    q.sql = this.sqlConfig.add
    q.insertData = req.body
    const data = await this.sqliteHelper.insertOne(q)
    console.log('add data', data)
    return data
  }
}

const model = new UserRoleModel(sqliteHelper, sqlConfig)
export default model