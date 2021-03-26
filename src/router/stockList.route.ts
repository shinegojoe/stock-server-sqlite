import express from 'express'

import controller from '../controller/stockList.controller'
// import validation from '../validation/scene.validation'
import validation from '../validation/stockList.validation'

const router = express.Router()

router.get('/', controller.list)
router.post('/', validation.stockListValidation, controller.add)
router.delete('/', controller.del)

// router.route('/:id')
//   .get()
//   .put()
//   .delete()

export default router