import { Request, Response, NextFunction} from 'express'
import model from '../model/style_img.model'

class StyleImgController {
  async styleImg(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await model.styleImg(req)
      res.status(200). json({
        imgData: data
      })
    } catch(e) {
      next(e)
    }
    
  }
}

const styleImgController = new StyleImgController()
export default styleImgController