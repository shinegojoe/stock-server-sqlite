import { Request } from 'express'
import SqlLiteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { SqliteQuery } from '../../../helper/DBHelper/IQueryObj'
const dbPath: any = process.env['SQLITE_PATH']

console.log(dbPath)
const sqliteHelper = new SqlLiteHelper(dbPath)


const add = async(req: Request) => {
  
  const q = new SqliteQuery()
  q.sql = 'INSERT or IGNORE INTO user(name,email) VALUES ($name,$email)'
  q.insertData = req.body
  const data = await sqliteHelper.insertOne(q)
  return data
}

const get = async(req: Request) => {
  const q = new SqliteQuery()
  q.sql = 'SELECT * from user WHERE id = $id'
  q.query = req.query
  const data = await sqliteHelper.findOne(q)
  return data
}

const update = async(req: Request) => {
  const q = new SqliteQuery()
  q.sql = 'UPDATE user SET name = $name WHERE id = $id'
  q.query = req.body
  q.tabName = 'user'
  const data = await sqliteHelper.updateOne(q)
  return data
}

const list = async(req: Request) => {
  const q = new SqliteQuery()
  q.sql = 'SELECT * from user'
  q.query = req.query
  const data = await sqliteHelper.findMany(q)
  return data
}

const del = async(req: Request) => {
  const q = new SqliteQuery()
  q.sql = 'DELETE from user WHERE id = $id'
  q.query = req.body
  q.tabName = 'user'
  const data = await sqliteHelper.deleteOne(q)
  return data
}

export default { add, get, list, update, del }