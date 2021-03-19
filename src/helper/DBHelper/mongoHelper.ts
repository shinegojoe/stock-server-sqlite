import IDBHelper from './IDBHelper'
import { MongoClient } from 'mongodb'


class MongoHelper {
  uri: string
  dbName: string
  opt: object
  constructor(uri: string, dbName: string) {
    this.uri = uri
    this.dbName = dbName
    this.opt =  { useUnifiedTopology: true }

    console.log("this is mgo helper")
  }

  

  async connect(): Promise<any>{
    const client = new MongoClient(this.uri, this.opt)
    await client.connect()
    return client

  }
  async insertOne(collectionName: string, data: object): Promise<object> {
    let client: any
    try {
      client = await this.connect()
      const database = client.db(this.dbName)
      const collection = database.collection(collectionName)
      const res = await collection.insertOne(data)
      return res.insertedId

    } catch(e) {
      return e

    } finally {
      await client.close()
    }
  }

  async insertMany(collectionName: string, data: object, opt={}): Promise<any> {

    let client: any
    try {
      client = await this.connect()
      const database = client.db(this.dbName)
      const collection = database.collection(collectionName)
      const res = await collection.insertMany(data, opt)
      return res.insertedCount

    } catch(e) {
      return e

    } finally {
      await client.close()
    }
  }

  async findOne(collectionName: string, query: object): Promise<object> {
    let client: any
    try {
      client =  await this.connect()
      const database = client.db(this.dbName)
      const collection = database.collection(collectionName)
      // Query for a movie that has the title 'Back to the Future'
      const res = await collection.findOne(query)
      return res
  
    } catch(e) {
      return e

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close()
    }
  }
  async findMany(collectionName: string, query: object, options={}): Promise<object>{
    let client: any
    const res: any[] = []
    try {
      client =  await this.connect()
      const database = client.db(this.dbName)
      const collection = database.collection(collectionName)
      // Query for a movie that has the title 'Back to the Future'
      const cursor = collection.find(query, options);
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
        return res
      }
      await cursor.forEach((element: any) => {
        // console.log(element)
        res.push(element)
      });
      return res
  
    } catch(e) {
      return e

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close()
    }
  }
  async deleteOne(collectionName: string, query: object): Promise<any> {
    let client: any
    try {
      client = await this.connect()
      const db = client.db(this.dbName)
      const collection = db.collection(collectionName)
      const res = await collection.deleteOne(query)
      return res.deletedCount
    } catch(e) {
      return e
    } finally{
      await client.close()
    }
  }

  async deleteMany(collectionName: string, query: object): Promise<any> {
    let client: any
    try {
      client = await this.connect()
      const db = client.db(this.dbName)
      const collection = db.collection(collectionName)
      const res = await collection.deleteMany(query)
      return res.deletedCount
    } catch(e) {
      return e
    } finally{
      await client.close()
    }
  }

  async updateOne(collectionName: string, query: object, data: object):Promise<any> {
    let client: any
    try {
      client = await this.connect()
      const db = client.db(this.dbName)
      const collection = db.collection(collectionName)
      const res = await collection.updateOne(query, data)
      return res.modifiedCount
    } catch(e) {
      return e
    } finally{
      await client.close()
    }
  }

  async replace(collectionName: string, query: object, data: object, opt={}): Promise<any>{
    let client: any
    try {
      client = await this.connect()
      const db = client.db(this.dbName)
      const collection = db.collection(collectionName)
      const res = await collection.replaceOne(query, data, opt)
      return res.modifiedCount

    } catch(e) {
      return e
    } finally {
      await client.close()
    }
  }
}

export default MongoHelper