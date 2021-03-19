import express from 'express'

import controller from '../controller/scene.controller'
import validation from '../validation/scene.validation'

const router = express.Router()

router.post('/', validation.userValidation ,controller.add)

// router.route('/:id')
//   .get()
//   .put()
//   .delete()

export default router