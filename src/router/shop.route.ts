import express from 'express'
import itemController from '../modules/shop/controller/item.controller'

const router = express.Router()

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

router.put(itemString, (req, res, next)=> {
  itemController.update(req, res, next)
})

router.delete(`${itemString}/:id`, (req, res, next)=> {
  itemController.del(req, res, next)
})


export default router