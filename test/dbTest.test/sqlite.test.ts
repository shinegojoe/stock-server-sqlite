import SqlLiteHelper from '../../src/DBHelper/sqlliteHelper'
import { SqliteQuery, QueryResult, IQueryObj, IQueryResult } from '../../src/DBHelper/IQueryObj'
import chai, { expect } from 'chai'


// const SqlLiteHelper = require('../../src/DBHelper/sqlliteHelper.ts')
// const { expect } = require('chai')

const tableInit = (sqlHelper: SqlLiteHelper) => {
  const sql = `CREATE TABLE IF NOT EXISTS testTable (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT,
    remark TEXT
  );`
  const q = new SqliteQuery()
  q.sql = sql
  q.query = {}
  sqlHelper.runSql(q)

}

describe("sqlite test", ()=> {
  const testDB = 'testDB.db'
  let sqlHelper = new SqlLiteHelper(testDB)
  tableInit(sqlHelper)

  before(()=> {
    // sqlHelper = new SqlLiteHelper()
  })
  it("insert one", ()=> {
    // const s = new SqlLiteHelper()
    let sql = "INSERT INTO testTable(name,remark) VALUES ($name,$remark)"
    const data = {
      name: "qq5777",
      remark: "qqq"
    }
    const q = new SqliteQuery()
    q.sql = sql
    q.insertData = data
    const res: IQueryResult = sqlHelper.insertOne(q)
    console.log("res", res.data)
    expect(res.data.changes).to.be.equal(1)
  })

  it("insert many", ()=> {
    let sql = "INSERT INTO testTable(name,remark) VALUES ($name,$remark)"
    const data1 = { name: "data1", remark: "yy" }
    const data2 = { name: "data2", remark: "xx" }
    const data3 = { name: "data3", remark: "zz" }
    const q = new SqliteQuery()
    q.sql = sql
    q.insertData = [data1, data2, data3]
    const res: IQueryResult = sqlHelper.insertMany(q)
    console.log("res", res)
    expect(res.data.insertedCount).to.be.equal(3)
  })
})


