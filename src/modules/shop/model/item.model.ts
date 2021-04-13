import { Request } from 'express'
import { QueryResult, SqliteQuery } from '../../../helper/DBHelper/IQueryObj'
import { BaseSqliteModel, ISqlConfig } from '../../../model/base.model'
import SqlLiteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { IItemBase } from '../../../IAPI/Ishop'
import { Database } from 'sqlite3'
import logoInfoModel from '../model/logoInfo.model'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqlLiteHelper(dbPath)

const sqlConfig: ISqlConfig = {
  add: 'INSERT or IGNORE INTO item(uid, title, imgUrl) VALUES ($uid, $title, $imgUrl)',
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
  async isShopOn(req: Request) {
    const q = new SqliteQuery()
    q.sql = 'UPDATE item SET isShopOn = $isShopOn WHERE id = $id'
    q.query = req.body
    const data = await sqliteHelper.runSql(q)
    const res = new QueryResult(data)
    return res
  }

  async update(req: Request) {
    console.log('update')
    const item: IItemBase = req.body.item
    // console.log('item', item)
    const db: Database = sqliteHelper.connect()
    const updateItemSql = 'UPDATE item SET title = $title, intro = $intro, \
    imgUrl = $imgUrl, price = $price WHERE id = $id'
    const stmt = db.prepare(updateItemSql)
    const _updateItemRes = stmt.run(item)
    // console.log('updateItemRes', updateItemRes)
    logoInfoModel.updateLogo(req)
    const res = new QueryResult({res: 'success'})
    return res
  }
}

const model = new ItemModel(sqliteHelper, sqlConfig)

export default model