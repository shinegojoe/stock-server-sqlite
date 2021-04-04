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
      intro TEXT NOT NULL,
      imgUrl TEXT NOT NULL,
      price INTEGER NOT NULL,
      FOREIGN KEY("uid") REFERENCES "user"("id")
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('item table', res)
}
const main = (dbPath) => {
  // const testDB = '../../../testDB.db'
  const db = dbInit(dbPath)
  createItem(db)
}
module.exports = main