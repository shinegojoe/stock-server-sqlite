import { IQueryResult, QueryResult } from '../helper/DBHelper/IQueryObj'
import { IBaseLayer } from './Ibase.layer'
import ServerResp from './serverResp'

class SqliteLayer implements IBaseLayer {
  name: string
  constructor(name: string) {
    this.name = name
  }
  add(data: any) {
    if(data.changes ===0) {
      // const queryRes = new QueryResult({
      //   message: `the ${this.name} is exist`
      // })
      // return queryRes
      const msg =  {
        message: `the ${this.name} is exist`
      }
      return new ServerResp(msg, 'error')

    }
    return new ServerResp(data, 'ok')
  }
  get(data: IQueryResult) {
    if(data === undefined) {
      // const queryRes = new QueryResult({
      //   message: `no ${this.name} find`
      // })
      // return queryRes
      const msg = {
        message: `no ${this.name} find`
      }
      return new ServerResp(msg, 'error')
    }
    return new ServerResp(data)
  }
  list(data: IQueryResult) {
    return new ServerResp(data)
  }
  update(data: any) {
    console.log(data)
    return new ServerResp(data)
  }

  del(data: any) {
    if(data.changes === 0) {
      // const queryRes = new QueryResult({
      //   message: `no ${this.name} find`
      // })
      const msg = {
        message: `no ${this.name} find`
      }
      return new ServerResp(msg, 'error')
    }
    return new ServerResp(data)
  }
}


export default SqliteLayer