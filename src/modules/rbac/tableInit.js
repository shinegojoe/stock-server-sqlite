const sqlite3 = require('better-sqlite3')



const dbInit = (dbPath) => {
  const db = new sqlite3(dbPath, { verbose: console.log })
  return db
}

const createUser = (db) => {
  const sql = `CREATE TABLE user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,  
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE 
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('user table', res)
}

const createRole = (db) => {
  // const sql = `CREATE Project projects (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  // );`
  const sql = `CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    name TEXT NOT NULL
  );`

  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('project role', res)
}

const createAuth = (db) => {
  const sql = `CREATE TABLE auth (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    name TEXT NOT NULL
  );`

  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('page auth', res)

}

const createUserRole = (db) => {
  const sql = `CREATE TABLE userRole (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    uid INTEGER NOT NULL,
    rid INTEGER NOT NULL,
    FOREIGN KEY("uid") REFERENCES "user"("id")
    FOREIGN KEY("rid") REFERENCES "role"("id")
  );`

  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('user-role table', res)
}

const createRoleAuth = (db) => {
  const sql = `CREATE TABLE roleAuth (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    rid INTEGER NOT NULL,
    aid INTEGER NOT NULL,
    FOREIGN KEY("rid") REFERENCES "role"("id")
    FOREIGN KEY("aid") REFERENCES "auth"("id")
  );`

  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('role-auth table', res)
}

const main = () => {
  const testDB = '../../../testDB.db'
  const db = dbInit(testDB)
  const begin = db.prepare('BEGIN')
  const commit = db.prepare('COMMIT')
  const rollback = db.prepare('ROLLBACK')
  begin.run()
  try {
    createUser(db)
    createRole(db)
    createAuth(db)
    createUserRole(db)
    createRoleAuth(db)
    commit.run()

  } catch(e) {
    console.log('e', e)
    // rollback.run()

  } finally {
    if(db.inTransaction) {
      rollback.run()
    }
    db.close()
  }
  
}

main()