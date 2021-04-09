import { Request, Response, NextFunction } from 'express'


interface IFileUpload {
  download(req: Request, res?: Response, next?: NextFunction): any
  upload(req: Request, res: Response, next: NextFunction): void
}





export { IFileUpload }