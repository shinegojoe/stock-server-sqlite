import { Request } from 'express'
import axios from 'axios'
import { IStyleImg } from 'IAPI/IImgStyle'


const styleImgUrl: any = process.env['STYLE_IMAGE_URL']

class StyleImgModel {
  async styleImg(req: Request) {
    // console.log(req.body)
    const data = req.body
    const res = await axios.post(styleImgUrl, data)
    return res.data
  }

  async styleList(req: Request) {
    const url = `${styleImgUrl}/modelPreview`
    const res = await axios.get(url)
    // todo parse url add host to styleImg/mosaic.jpg"
    const mapList: IStyleImg[] = res.data.mapList
    for(let item of mapList) {
      const newPath = `${styleImgUrl}/${item.path}`
      item.path = newPath
    }

    return mapList
  }
}

const model = new StyleImgModel()

export default model