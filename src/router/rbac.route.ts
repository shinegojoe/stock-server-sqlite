import express from 'express'
import userController from '../modules/rbac/controller/user.controller'
import validation from '../modules/rbac/validation'

const router = express.Router()

const userSting: string = '/user'
router.post(userSting, validation.addUser, userController.add)
router.get(`${userSting}/:id`, userController.get)
router.get(userSting, userController.list)
router.put(userSting, userController.update)
router.delete(userSting, userController.del)
// router.delete('/', controller.del)

// router.route('/:id')
//   .get()
//   .put()
//   .delete()

export default router