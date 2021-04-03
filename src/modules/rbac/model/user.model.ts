import SqlLiteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { BaseSqliteModel, ISqlConfig } from '../../../model/base.model'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqlLiteHelper(dbPath)

const sqlConfig: ISqlConfig = {
  add: 'INSERT or IGNORE INTO user(name,email,password) VALUES ($name,$email,$password)',
  get: 'SELECT * from user WHERE id = $id',
  list: 'SELECT * from user',
  update: 'UPDATE user SET name = $name WHERE id = $id',
  del: 'DELETE from user WHERE id = $id',
  tableName: 'user'
}
const model = new BaseSqliteModel(sqliteHelper, sqlConfig)

export default model

// const add = async(req: Request) => {
  
//   const q = new SqliteQuery()
//   q.sql = 'INSERT or IGNORE INTO user(name,email) VALUES ($name,$email)'
//   q.insertData = req.body
//   const data = await sqliteHelper.insertOne(q)
//   return data
// }

// const get = async(req: Request) => {
//   const q = new SqliteQuery()
//   q.sql = 'SELECT * from user WHERE id = $id'
//   q.query = req.params
//   const data = await sqliteHelper.findOne(q)
//   return data
// }

// const update = async(req: Request) => {
//   const q = new SqliteQuery()
//   q.sql = 'UPDATE user SET name = $name WHERE id = $id'
//   q.query = req.body
//   q.tabName = 'user'
//   const data = await sqliteHelper.updateOne(q)
//   return data
// }

// const list = async(req: Request) => {
//   const q = new SqliteQuery()
//   q.sql = 'SELECT * from user'
//   q.query = req.query
//   const data = await sqliteHelper.findMany(q)
//   return data
// }

// const del = async(req: Request) => {
//   const q = new SqliteQuery()
//   q.sql = 'DELETE from user WHERE id = $id'
//   q.query = req.params
//   q.tabName = 'user'
//   const data = await sqliteHelper.deleteOne(q)
//   return data
// }

