import httpStatus from 'http-status'
import { Request, Response, NextFunction} from 'express'
import itemModel from '../model/item.model'
import { BaseController } from '../../../controller/base.controller'
import SqliteLayer from '../../../responseLayer/sqlite.layer'
import { BaseSqliteModel } from '../../../model/base.model'
import logoInfoModel from '../model/logoInfo.model'


const respLayer = new SqliteLayer('item')

class ItemController extends BaseController {
  constructor(model: BaseSqliteModel, respLayer: SqliteLayer) {
    super(model, respLayer)
  }

  async isShopOn(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await itemModel.isShopOn(req)
      res.status(httpStatus.OK).json(data)
    } catch (e) {
      next(e)
    }
  }

  async test(req: Request, res: Response, next: NextFunction) {
    const resp = await logoInfoModel.updateLogo(req)
    res.status(httpStatus.OK).json({
      resp
    })

  }

  async shopItem(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await itemModel.shopItem(req)
      res.status(httpStatus.OK).json(data)
    } catch (e) {
      next(e)
    }
  }


}

const itemController = new ItemController(itemModel, respLayer)

export default itemController