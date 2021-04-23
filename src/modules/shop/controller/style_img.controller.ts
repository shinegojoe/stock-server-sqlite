import { Request, Response, NextFunction} from 'express'
import httpStatus from 'http-status'
import model from '../model/style_img.model'

class StyleImgController {
  async styleImg(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await model.styleImg(req)
      res.status(httpStatus.OK). json({
        imgData: data
      })
    } catch(e) {
      next(e)
    }
  }

  async styleList(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await model.styleList(req)
      res.status(httpStatus.OK).json(data)
    } catch(e) {
      next(e)
    }
  }
}

const styleImgController = new StyleImgController()
export default styleImgController