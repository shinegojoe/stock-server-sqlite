import express from 'express'
import userController from '../modules/rbac/controller/user.controller'
import roleController from '../modules/rbac/controller/role.controller'
import validation from '../modules/rbac/validation'

const router = express.Router()

router.get('/xxx/:name', (req, res, next)=>{
    console.log('xxx', req.params)

    res.json({})
  })

const userSting: string = '/user'
router.post(userSting, validation.addUser, userController.add)
router.get(`${userSting}/:id`, userController.get)
router.get(userSting, userController.list)
router.put(userSting, userController.update)
router.delete(`${userSting}/:id`, userController.del)

const roleString: string = '/role'
router.post(roleString, roleController.add)
router.get(`${roleString}/:id`, roleController.get)
router.get(roleString, roleController.list)
router.put(roleString, roleController.update)
router.delete(`${roleString}/:id`, roleController.del)

// router.route('/:id')
//   .get()
//   .put()
//   .delete()

export default router