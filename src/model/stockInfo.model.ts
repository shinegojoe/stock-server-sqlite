require('dotenv').config()
import { Request, Response, NextFunction} from 'express'
import { body } from 'express-validator'
import { MongoQuery, QueryResult } from '../helper/DBHelper/IQueryObj'
import MongoHelper from '../helper/DBHelper/mongoHelper'

const uri: any = process.env['MONGO_HOST']
const dbName: any = process.env['MONGO_DBNAME']
const collName = 'twStock'
const mgoHelper = new MongoHelper(uri, dbName)

const add = async(req: Request, res: Response, next: NextFunction) => {
  const mq1 = new MongoQuery()
  mq1.collectionName = collName
  mq1.query = req.body
  const findOne = await mgoHelper.findOne(mq1)
  console.log('findOne', findOne)
  if(findOne.data === null) {
    const mq2 = new MongoQuery()
    mq2.collectionName = collName
    mq2.insertData = req.body
    const data = await mgoHelper.insertOne(mq2)
    return data
  } else {
    const data = new QueryResult("data is exist")
    return data
  }

  
}

const get = (req: Request, res: Response, next: NextFunction) => {

}

const list = async(req: Request, res: Response, next: NextFunction) => {
  const mq = new MongoQuery()
  mq.collectionName = collName
  mq.query = req.body
  const data = await mgoHelper.findMany(mq)
  // console.log('yy', req.body)
  return data
}

const del = async(req: Request, res: Response, next: NextFunction) => {
  const mq = new MongoQuery()
  mq.collectionName = collName
  mq.query = req.body
  const data = await mgoHelper.deleteMany(mq)
  return data
}

export default { add, get, list, del }