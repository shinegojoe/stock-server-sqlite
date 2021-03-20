import { Response, Request, NextFunction } from 'express'
import MongoHelper from '../helper/DBHelper/mongoHelper'
import { MongoQuery } from '../helper/DBHelper/IQueryObj'

const uri: any = process.env['MONGO_HOST']
const dbName: any = process.env['MONGO_DBNAME']
const collName = 'stockList'
const mgoHelper = new MongoHelper(uri, dbName)

const add = async(req: Request, res: Response, next: NextFunction) => {
  const q = new MongoQuery()
  q.collectionName = collName
  q.insertData = req.body
  const data = await mgoHelper.insertOne(q)
  return data
}

const list = async(req: Request, res: Response, next: NextFunction) => {
  const q = new MongoQuery()
  q.collectionName = collName
  q.query = req.body
  const data = await mgoHelper.findMany(q)
  return data
}

const del = async(req: Request, res: Response, next: NextFunction) => {
  const q = new MongoQuery()
  q.collectionName = collName
  q.query = req.body
  const data = await mgoHelper.deleteMany(q)
  return data
}

export default { add, list, del }