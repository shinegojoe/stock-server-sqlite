import { IQueryObj, IQueryResult } from './IQueryObj'

interface IDBHelper {
  connect():any
  // insertOne(collectionName: string, data: object): object
  // insertMany(collectionName: string, data: object, opt: object): any
  // findOne(collectionName: string,sql: any, query: any): object
  // findMany(collectionName: string, query: any, options: object): object
  // deleteOne(collectionName: string, query: object): any
  // deleteMany(collectionName: string, query: object): any
  // updateOne(collectionName: string, query: object, data: object): any
  // replace(collectionName: string, quety: object, data: object, opt: object): any
  findOne(queryObj: IQueryObj): IQueryResult
  findMany(queryObj: IQueryObj): IQueryResult
  insertOne(queryObj: IQueryObj): IQueryResult
  insertMany(queryObj: IQueryObj): IQueryResult
  deleteOne(queryObj: IQueryObj): IQueryResult
  deleteMany(queryObj: IQueryObj): IQueryResult
  updateOne(queryObj: IQueryObj): IQueryResult
  updateMany(queryObj: IQueryObj): IQueryResult



}

export default IDBHelper