const path = require('path');
import { Request, Response, NextFunction } from 'express'
import { IFileUpload } from '../IFileUpload'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { SqliteQuery } from '../../../helper/DBHelper/IQueryObj'
import SqlLiteHelper from '../../../helper/DBHelper/sqlliteHelper'
const uploadFolder: any = process.env['UPLOAD_FOLDER']
const dbPath: any = process.env['SQLITE_PATH']

const sqliteHelper = new SqlLiteHelper(dbPath)

class FileUploadModel {
  
  async upload(req: any) {
    // console.log('files', req.fields)
    // console.log('req', req.files)
    // console.log('body', req.body)
    // console.log('query', req.query)
    // console.log(uploadFolder)
    const q = new SqliteQuery()
    q.sql = 'UPDATE item SET imgUrl = $imgUrl WHERE id = $id'
    q.query = {
      id: req.query.id,
      imgUrl: path.basename(req.files.file.path)
    }
    const data = await sqliteHelper.runSql(q)
    // console.log('add data', data)
    return data
  }

  async download(req: Request) {
    const q = new SqliteQuery()
    q.sql = 'SELECT * from item WHERE id = $id'
    q.query = {
      id: req.query.id
    }
    const data = await sqliteHelper.findOne(q)
    console.log('data', data)
    const imgPath = `${uploadFolder}/${data.data.imgUrl}`
    return imgPath
  }
}
const model = new FileUploadModel()

export default model