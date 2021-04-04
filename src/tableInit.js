var rbacInit = require('./modules/rbac/tableInit')
var shopInit = require('./modules/shop/tableInit')

const main = () => {
  const dbPath = '../testDB.db'
  rbacInit(dbPath)
  shopInit(dbPath)
}

main()