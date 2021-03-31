import { IQueryResult, QueryResult } from '../helper/DBHelper/IQueryObj'
import { IBaseLayer } from './Ibase.layer'

class SqliteLayer implements IBaseLayer {
  name: string
  constructor(name: string) {
    this.name = name
  }
  add(data: IQueryResult) {
    if(data.data.changes ===0) {
      const queryRes = new QueryResult({
        message: `the ${this.name} is exist`
      })
      return queryRes
    }
    return data
  }
  get(data: IQueryResult) {
    if(data.data === undefined) {
      const queryRes = new QueryResult({
        message: `no ${this.name} find`
      })
      return queryRes
    }
    return data
  }
  list(data: IQueryResult) {
    return data
  }
  update(data: IQueryResult) {
    return data
  }

  del(data: IQueryResult) {
    if(Object.entries(data.data).length === 0) {
      const queryRes = new QueryResult({
        message: `no ${this.name} find`
      })
      return queryRes
    }
    return data
  }
}


export default SqliteLayer