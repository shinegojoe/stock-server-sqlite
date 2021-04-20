import { Request } from 'express'
import axios from 'axios'


const styleImgUrl: any = process.env['STYLE_IMAGE_URL']

class StyleImgModel {
  async styleImg(req: Request) {
    // console.log(req.body)
    const data = req.body
    const res = await axios.post(styleImgUrl, data)
    return res.data
  }
}

const model = new StyleImgModel()

export default model