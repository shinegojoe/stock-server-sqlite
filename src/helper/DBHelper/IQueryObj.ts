

export interface IQueryObj {
  sql: string
  query: any
  insertData: any
  tabName: string
}

export interface IQueryResult {
  data: any
}

class QueryObj {

}

export class QueryResult implements IQueryResult {
  private _data: any
  constructor(res: any) {
    this._data = res
  }
  public get data() {
    return this._data
  }
}

// class MgoQuery implements IQueryObj {

// }

export class SqliteQuery implements IQueryObj {
  private _sql: string = ''
  private _query: any = undefined
  private _insertData: any = undefined
  private _tabName: string = ''

  
  constructor() {
  }

  public set sql(sql: string) {
    this._sql = sql
  }
  public get sql() {
    return this._sql
  }

  public set query(query: any) {
    this._query = query
  }
  public get query() {
    return this._query
  }

  public set insertData(data: any) {
    this._insertData = data
  }
  public get insertData() {
    return this._insertData
  }

  public set tabName(name: string) {
    this._tabName = name 
  }
  public get tabName() {
    return this._tabName
  }

  
}