import { generateJWT, verifyJWT } from '../src/helper/jwtHelper/jwtHelper'
import MongoHelper from '../src/helper/DBHelper/mongoHelper'

async function main() {
  const uri: string = "mongodb://167.179.80.227:5569"
  const dbName: string = 'stock'
  const mgoHelper = new MongoHelper(uri, dbName)
  const testUser = {
    name: "testUser", 
    password: 1234
  }
  const collName = "testCollection"
  // await mgoHelper.insertOne(collName, testUser)
  const res = await mgoHelper.findOne(collName, testUser)
  console.log('res', res)
  const token: string = generateJWT(res)
  console.log('token', token)
  const decode: any = verifyJWT(token)
  console.log("decode", decode)

  
}

main()

