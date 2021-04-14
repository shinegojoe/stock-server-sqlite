import { Request } from 'express'
import { QueryResult, SqliteQuery } from '../../../helper/DBHelper/IQueryObj'
import { BaseSqliteModel, ISqlConfig } from '../../../model/base.model'
import SqlLiteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { IItemBase } from '../../../IAPI/Ishop'
import { Database } from 'sqlite3'
import logoInfoModel from '../model/logoInfo.model'
import { saveBase64 } from '../../../utils/imgHandler'

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
    const itemId = item.id as number
    const imgName = await saveBase64(item.imgData,itemId, 'cover.png')
    item.imgUrl = imgName
    const db: Database = sqliteHelper.connect()
    const updateItemSql = 'UPDATE item SET title = $title, intro = $intro, \
    imgUrl = $imgUrl, price = $price WHERE id = $id'
    const stmt = db.prepare(updateItemSql)
    const _updateItemRes = stmt.run(item)
    // console.log('updateItemRes', updateItemRes)
    logoInfoModel.updateLogo(req)
    const res = new QueryResult({res: 'success'})
    db.close()
    return res
  }

  async del(req: Request) {
    // delete all logo where itemId = id
    // delete item
    const id: number = parseInt(req.params.id)
    const db: any = sqliteHelper.connect()
    const begin = db.prepare('BEGIN')
    const commit = db.prepare('COMMIT')
    const rollback = db.prepare('ROLLBACK')
    begin.run()
    try {
      const delLogoListSql = 'DELETE from logoInfo WHERE itemId = $itemId'
      const stmt = db.prepare(delLogoListSql)
      stmt.run({itemId: id})
      const delItemSql = 'DELETE from item WHERE id = $id'
      const stmt2 = db.prepare(delItemSql)
      stmt2.run({id: id})
      commit.run()

    } catch(e) {
      console.log(e)
    } finally {
      if(db.inTransaction) {
        rollback.run()
      }
      db.close()
    }
    const res = new QueryResult({res: 'success'})
    return res

  }

  async shopItem(req: Request) {
    const q = new SqliteQuery()
    q.sql = 'SELECT * from item WHERE isShopOn = $isShopOn'
    q.query = {
      isShopOn: 1
    }
    const data = await sqliteHelper.findMany(q)
    const res = new QueryResult(data)
    return res
  }
}

const model = new ItemModel(sqliteHelper, sqlConfig)

export default model