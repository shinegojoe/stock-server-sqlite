// require('./dbTest.test/sqlite.test')


describe('test start', ()=> {
  // describe('sqlite test', ()=>{
  //   require('./dbTest.test/sqlite.test')
  // })
  // describe("mongo test", ()=> {
  //   require('./dbTest.test/mongo.test')
  // })

  describe("api test", ()=> {
    // require('./apiTest.test/stockList.test')
    require('./apiTest.test/stockInfo.test')
  })
})