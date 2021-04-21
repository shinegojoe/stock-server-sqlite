import express from 'express'
import itemController from '../modules/shop/controller/item.controller'
import logoInfoController from '../modules/shop/controller/logoInfo.controller'
import styleImgController from '../modules/shop/controller/style_img.controller'

const router = express.Router()

/* item..............*/

const itemString = '/item'
router.post(itemString, (req, res, next)=> {
  itemController.add(req, res, next)
})

router.get(`${itemString}/:id`, (req, res, next)=> {
  itemController.get(req, res, next)
})

router.get(itemString, (req, res, next)=> {
  itemController.list(req, res, next)
})

router.patch(itemString, (req, res, next)=> {
  itemController.update(req, res, next)
})

router.delete(`${itemString}/:id`, (req, res, next)=> {
  itemController.del(req, res, next)
})

router.patch(`${itemString}/isShopOn`, (req, res, next)=> {
  itemController.isShopOn(req, res, next)
})


const shopItemString = '/shopItem'
router.get(shopItemString, (req, res, next)=> {
  itemController.shopItem(req, res, next)
})



/* logoInfo..............*/
const logoInfoString = '/logoInfo'

router.get(`${logoInfoString}`, (req, res, next)=> {
  logoInfoController.getLogoList(req, res, next)
})


/* style image........... */
const styleImgString = '/styleImg'
router.post(`${styleImgString}`, (req, res, next)=> {
  styleImgController.styleImg(req, res, next)
})

router.get('/styleList', (req, res, next)=> {
  styleImgController.styleList (req, res, next)
})



export default router