import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { IFileUpload } from '../IFileUpload'
import model from '../model/fileUpload.model'

class FileUploadController implements IFileUpload {
  
  async download(req: Request, res: Response, next: NextFunction) {
    const data = await model.download(req)
    res.download(data)
  }
  async upload(req: Request, res: Response, next: NextFunction) {
      const data = await model.upload(req)
      res.status(httpStatus.OK).json(data)
  }
  
}

const controller = new FileUploadController()
export default controller

