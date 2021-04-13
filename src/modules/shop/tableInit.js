const sqlite3 = require('better-sqlite3')



const dbInit = (dbPath) => {
  const db = new sqlite3(dbPath, { verbose: console.log })
  return db
}

const createItem = (db) => {
  const sql = `CREATE TABLE item (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      uid INTEGER NOT NULL,
      title TEXT NOT NULL,
      intro TEXT NOT NULL DEFAULT '',
      imgUrl TEXT NOT NULL,
      price INTEGER NOT NULL DEFAULT 0,
      isShopOn INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY("uid") REFERENCES "user"("id")
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('item table', res)
}

const createLogoInfo = (db) => {
  const sql = `CREATE TABLE logoInfo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    itemid INTEGER NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    w INTEGER NOT NULL,
    h INTEGER NOT NULL,
    ratio REAL NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY("itemid") REFERENCES "item"("id")
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('logoInfo table', res)
}

const main = (dbPath) => {
  // const testDB = '../../../testDB.db'
  const db = dbInit(dbPath)
  createItem(db)
  createLogoInfo(db)
}
module.exports = main