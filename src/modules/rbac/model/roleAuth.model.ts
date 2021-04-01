import { Request } from 'express'
import SqlLiteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { BaseSqliteModel, ISqlConfig } from '../../../model/base.model'
import { SqliteQuery } from '../../../helper/DBHelper/IQueryObj'


const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqlLiteHelper(dbPath)

const sqlConfig: ISqlConfig = {
  add: 'INSERT or IGNORE INTO roleAuth(rid, aid) VALUES ($rid, $aid)',
  get: 'SELECT * from roleAuth WHERE id = $id',
  list: 'SELECT * from roleAuth',
  update: 'UPDATE roleAuth SET rid = $rid, aid = $aid WHERE id = $id',
  del: 'DELETE from roleAuth WHERE id = $id',
  tableName: 'roleAuth'
}

class RoleAuthModel extends BaseSqliteModel {
  constructor(sqliteHelper: SqlLiteHelper, sqlConfig: ISqlConfig) {
    super(sqliteHelper, sqlConfig)
  }
  async add(req: Request) {
    const findQ = new SqliteQuery()
    findQ.sql = 'SELECT * from roleAuth WHERE rid = $rid AND aid = $aid'
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
const model = new RoleAuthModel(sqliteHelper, sqlConfig)

export default model

