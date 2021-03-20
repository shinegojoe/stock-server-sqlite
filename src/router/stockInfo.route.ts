import express from 'express'
import { resolveTripleslashReference } from 'typescript'

import controller from '../controller/stockInfo.controller'
import validation from '../validation/scene.validation'

const router = express.Router()

router.get('/' ,controller.list)
router.post('/', controller.add)
router.delete('/', controller.del)

// router.route('/:id')
//   .get()
//   .put()
//   .delete()

export default router