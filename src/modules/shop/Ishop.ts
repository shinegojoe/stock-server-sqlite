import { Request, Response, NextFunction } from 'express'


interface IItemController {
  addItem(req: Request, res: Response, next: NextFunction): void
  getItem(req: Request, res: Response, next: NextFunction): void
  listItem(req: Request, res: Response, next: NextFunction): void
  updateItem(req: Request, res: Response, next: NextFunction): void
  deleteItem(req: Request, res: Response, next: NextFunction): void


}

interface IItemModel {
  addItem(req: Request): any
  getItem(req: Request): any
  listItem(req: Request): any
  updateItem(req: Request): any
  deleteItem(req: Request): any
}

export { IItemController, IItemModel }