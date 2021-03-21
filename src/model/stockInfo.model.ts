require('dotenv').config()
import { Request, Response, NextFunction} from 'express'
import { body } from 'express-validator'
import { MongoQuery, QueryResult, Payload } from '../helper/DBHelper/IQueryObj'
import MongoHelper from '../helper/DBHelper/mongoHelper'
import mongoCRUD from '../model/mongoCRUD.model'

const uri: any = process.env['MONGO_HOST']
const dbName: any = process.env['MONGO_DBNAME']
const collName = 'twStock'
const mgoHelper = new MongoHelper(uri, dbName)

const add = async(req: Request) => {
  const p = new Payload()
  p.data = { collectionName: collName }
  const data = await mongoCRUD.add(req, p)
  return data
}

const get = (req: Request) => {

}

const list = async(req: Request) => {
  const p = new Payload()
  p.data = { collectionName: collName }
  const data = await mongoCRUD.list(req, p)
  return data
}

const del = async(req: Request) => {
  const p = new Payload()
  p.data = { collectionName: collName }
  const data = await mongoCRUD.del(req, p)
  return data
}

export default { add, get, list, del }