import { IQueryResult, QueryResult } from '../helper/DBHelper/IQueryObj'

const get = (data: IQueryResult, name: string)=> {
  // console.log('data', data)
  if(data.data === undefined) {
    const queryRes = new QueryResult({
      message: `no ${name} find`
    })
    return queryRes
  }
  return data
}

const del = (data: IQueryResult, name: string) => {
  // console.log('del', data)
  if(Object.entries(data.data).length === 0) {
    const queryRes = new QueryResult({
      message: `no ${name} find`
    })
    return queryRes
  }
  return data
}

export default { get, del }