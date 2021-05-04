// var rbacInit = require('./modules/rbac/tableInit')
// var shopInit = require('./modules/shop/tableInit')
const sqlite3 = require('better-sqlite3')

var stockInit = require('./modules/stock/tableInit')

const dbInit = (dbPath) => {
  const db = new sqlite3(dbPath, { verbose: console.log })
  return db
}

const main = () => {
  const dbPath = '../testDB.db'
  const db = dbInit(dbPath)
  stockInit(db)
  // rbacInit(dbPath)
  // shopInit(dbPath)
}

main()