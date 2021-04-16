import fs from 'fs'
import { Request } from 'express'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { RunResult } from 'sqlite3'
import { ILogoInfoBase, IItemBase } from '../../../IAPI/Ishop'
import { SqliteQuery, QueryResult } from '../../../helper/DBHelper/IQueryObj'
import { saveBase64 } from '../../../utils/imgHandler'

const dbPath: any = process.env['SQLITE_PATH']
const uploadFolder = process.env['UPLOAD_FOLDER']
const sqliteHelper = new SqliteHelper(dbPath)


class LogoInfoModel {

  async getLogoList(req: Request) {
    const q = new SqliteQuery()
    q.query = req.query
    q.sql = 'SELECT * from logoInfo WHERE itemId = $itemId'
    console.log(q.query)
    const data = await sqliteHelper.findMany(q)
    return data
  }

  runCmd(db: any, sql: string, item: any) {
    const stmt = db.prepare(sql)
    const res = stmt.run(item)
    // console.log('res', res)
  }

  saveImage(item: ILogoInfoBase): Promise<string> {
    const itemId: number = item.id as number
    return saveBase64(item.imgData, itemId, item.name)
  }

  async updateLogo(req: Request) {
    const db = sqliteHelper.connect()
    const begin = db.prepare('BEGIN')
    const commit = db.prepare('COMMIT')
    const rollback = db.prepare('ROLLBACK')
    begin.run()
    try {
      // console.log(req.body)
      const logoList: ILogoInfoBase [] = req.body.logoList
      
      const item: IItemBase = req.body.item
      const itemId: number = item.id as number
      const q1 = 'SELECT * from logoInfo WHERE itemId = $itemId'
      const stmt = db.prepare(q1)
      const logoListRes = stmt.all({itemId})
      // console.log('llll', logoListRes)
      const updateIds = []
      for(const item of logoList) {
        const q = 'SELECT * from logoInfo WHERE itemId = $itemId AND name = $name'
        const stmt = db.prepare(q)
        const res = stmt.get(item)
        const imgPath = await this.saveImage(item)
        item.imgUrl = imgPath

        // console.log('res', res)
        if(res === undefined) {
          // add new
          const insertSql: string = 'INSERT INTO logoInfo(itemId, x, y, w, h, ratio, name, imgUrl) \
          VALUES ($itemId, $x, $y, $w, $h, $ratio, $name, $imgUrl)'
          this.runCmd(db, insertSql, item)
        } else {
          // update
          // console.log('upupres', res)
          const updateSql = 'UPDATE logoInfo SET itemId = $itemId, x = $x, y = $y, \
          w = $w, h = $h, ratio = $ratio, name = $name, imgUrl = $imgUrl WHERE id = $id'
          this.runCmd(db, updateSql, {
            id: res.id,
            itemId: item.itemId,
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
            ratio: item.ratio,
            name: item.name,
            imgUrl: item.imgUrl
          })
          updateIds.push(res.id)
        }
      }
      // console.log('upup', updateIds)
      for(const res of logoListRes) {
        if(!updateIds.includes(res.id)) {
          // remove
          // console.log('remove')
          const removeSql = 'DELETE from logoInfo WHERE id = $id'
          this.runCmd(db, removeSql, res)
        }
      }

      commit.run()

    } catch(e) {
      console.log('e', e)

    } finally {
      if(db.inTransaction) {
        rollback.run()
      }
      db.close()
      return true
    }

  }
}

const model = new LogoInfoModel()

export default model