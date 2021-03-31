import { IQueryResult } from '../helper/DBHelper/IQueryObj'

interface IBaseLayer {
  add(data: IQueryResult, name: string): IQueryResult
  list(data: IQueryResult, name: string): IQueryResult
  get(data: IQueryResult, name: string): IQueryResult
  update(data: IQueryResult, name: string): IQueryResult
  del(data: IQueryResult, name: string): IQueryResult
}

export { IBaseLayer }