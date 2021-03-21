import { Response, Request, NextFunction } from 'express'
import MongoHelper from '../helper/DBHelper/mongoHelper'
import { MongoQuery } from '../helper/DBHelper/IQueryObj'
import mongoCRUD from '../model/mongoCRUD.model'

const uri: any = process.env['MONGO_HOST']
const dbName: any = process.env['MONGO_DBNAME']
const collName = 'stockList'
const mgoHelper = new MongoHelper(uri, dbName)
import { Payload, MgoPayload } from '../helper/DBHelper/IQueryObj'


const add = async(req: Request) => {
  const p = new Payload()
  p.data = { collectionName: 'stockList'}
  const data = await mongoCRUD.add(req, p)
  return data
}

const list = async(req: Request) => {
  const p = new Payload()
  p.data = { collectionName: 'stockList'}
  const data = await mongoCRUD.list(req, p)
  return data
}

const del = async(req: Request, res: Response, next: NextFunction) => {
  const p = new Payload()
  p.data = { collectionName: 'stockList'}
  const data = await mongoCRUD.del(req, p)
  return data
}

export default { add, list, del }