require('module-alias/register')
import MongoHelper from './helper/DBHelper/mongoHelper'
import SqlLiteHelper from './helper/DBHelper/sqlliteHelper'
import { SqliteQuery, QueryResult, IQueryObj, IQueryResult, MongoQuery } from './helper/DBHelper/IQueryObj'


async function main() {
  const uri: string = "mongodb://167.179.80.227:5569"
  const dbName: string = 'stock'
  const mgoHelper = new MongoHelper(uri, dbName)
  // const sql = new SqlLiteHelper()
  const collName = "testCollection"
  const data = {
    name: "test1243",
    mail: "xxxx"
  }
  // const res = await mgoHelper.insertOne(collName, data)
  // console.log("insert", res)
  // // res.then((res)=> {
  // //   console.log("res", res)
  // // }).catch((e)=> {
  // //   console.log("err", e)
  // // })
  const mq = new MongoQuery()
  mq.collectionName = collName
  mq.query = {}
  const xx = await mgoHelper.findOne(mq)
  console.log("find one", xx)

  // const yy = await mgoHelper.findMany(collName, {})
  // console.log("find many", yy)

  // const zz = await mgoHelper.deleteMany(collName, {
  //   name: "test1243"
  // })
  // console.log('delete one', zz)
  
  // console.log("main")
  // const qq = await mgoHelper.updateOne(collName, {name: 'test1243'}, {
  //   $set: {
  //     mail: "99888"
  //   }
  // })
  // console.log('update one', qq)
  // const q2 = await mgoHelper.insertMany(collName, [
  //   {d1: 'd1'}, {d2: 'd2'}
  // ])
  // console.log('insert many', q2)
  // const q3 = await mgoHelper.replace(collName, {name: "99888"}, {name: "55666"})
  // console.log('replace', q3)
}

class SqliteTester {
  sqlHelper: SqlLiteHelper
  constructor() {
    this.sqlHelper = new SqlLiteHelper('sqlite.db')
  }

  async insertOne() {
    let sql = "INSERT INTO tab2(name,remark) VALUES ($name,$remark)"
    const data = {
      name: "qq5777",
      remark: "qqq"
    }
    const q = new SqliteQuery()
    q.sql = sql
    q.insertData = data
    const res: IQueryResult = await this.sqlHelper.insertOne(q)
    console.log("res", res)
  }

  async insertMany() {
    let sql = "INSERT INTO tab2(name,remark) VALUES ($name,$remark)"
    const data1 = { name: "data1", remark: "yy" }
    const data2 = { name: "data2", remark: "xx" }

    const q = new SqliteQuery()
    q.sql = sql
    q.insertData = [data1, data2]
    const res: IQueryResult = await this.sqlHelper.insertMany(q)
    console.log("res", res)

  }

  async findOne() {
    const sql = `SELECT * from tab2 WHERE name = $name`

    const query = { name: "data1"}
    const q = new SqliteQuery()
    q.sql = sql
    q.query = query
    const res = await this.sqlHelper.findOne(q)
    console.log("res", res)
  }

  async findMany() {
    // const sql = `SELECT * from tab2 WHERE name = $name`
    const sql = `SELECT * from tab2`

    const query = { name: "qq5777"}
    const q = new SqliteQuery()
    q.sql = sql
    q.query = {}
    const res = await this.sqlHelper.findMany(q)
    console.log("res", res)
  }

  async deleteOne() {
    // const sql = `SELECT * from tab2 WHERE name = $xxx`
    const sql = `DELETE from tab2 WHERE name = $xxx`

    const param = {
      xxx: "data1" 
    }
    const q = new SqliteQuery()
    q.sql = sql
    q.query = param
    q.tabName = 'tab2'
    const res: IQueryResult = await this.sqlHelper.deleteOne(q)
    console.log("res", res.data)
  }

  async deleteMany() {
    const sql = `DELETE from tab2 WHERE name = $xxx`
    const param = {
      xxx: "data2" 
    }
    const q = new SqliteQuery()
    q.sql = sql
    q.query = param
    const res: IQueryResult = await this.sqlHelper.deleteMany(q)
    console.log("res", res.data)
  }

  async updateOne() {
    const sql = `UPDATE tab2 SET name = $newName, remark = $remark WHERE name = $oldName`
    const param = {
      oldName: "newName",
      newName: "qqq",
      remark: "newRemark"
    }
    const q = new SqliteQuery()
    q.sql = sql
    q.query = param
    q.tabName = 'tab2'
    const res = await this.sqlHelper.updateOne(q)
    console.log('res', res)
  }

  async updateMany() {
    const sql = `UPDATE tab2 SET name = $newName, remark = $remark WHERE name = $oldName`
    const param = {
      oldName: "newName",
      newName: "newXXX",
      remark: "newRemark"
    }
    const q = new SqliteQuery()
    q.sql = sql
    q.query = param
    const res = await this.sqlHelper.runSql(q)
    console.log('res', res)
  }

  replace() {

  }

}

function sqlTest() {
  const t = new SqliteTester()
  // t.insertOne()
  // t.insertMany()
  // t.findMany()
  // t.findOne()
  // t.deleteOne()
  // t.deleteMany()
  // t.updateOne()
  // t.updateMany()
  t.findMany()
}

// sqlTest()


main()