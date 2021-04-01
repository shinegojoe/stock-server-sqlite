import express from 'express'
import userController from '../modules/rbac/controller/user.controller'
import roleController from '../modules/rbac/controller/role.controller'
import authController from '../modules/rbac/controller/auth.controller'
import roleAuthController from '../modules/rbac/controller/roleAuth.controller'
import userRoleController from '../modules/rbac/controller/userRole.controller'
import validation from '../modules/rbac/validation'

const router = express.Router()

router.get('/xxx/:name', (req, res, next)=>{
    console.log('xxx', req.params)

    res.json({})
  })

/* user router ................................. */
const userSting: string = '/user'
// router.post(userSting, validation.addUser, userController.add)
// router.get(`${userSting}/:id`, userController.get)
// router.get(userSting, userController.list)
// router.put(userSting, userController.update)
// router.delete(`${userSting}/:id`, userController.del)
router.post(userSting, validation.addUser, (req:any, res: any, next: any)=> {
  userController.add(req, res, next)
})
router.get(userSting, (req, res, next)=> {
  userController.list(req, res, next)
})
router.get(`${userSting}/:id`, (req, res, next)=> {
  userController.get(req, res, next)
})

router.put(userSting, (req, res, next)=> {
  userController.update(req, res, next)
})

router.delete(`${userSting}/:id`, (req, res, next)=> {
  userController.del(req, res, next)
})


/* role router ................................. */
const roleString: string = '/role'
router.post(roleString, (req, res, next)=> {
  roleController.add(req, res, next)
})
router.get(roleString, (req, res, next)=> {
  roleController.list(req, res, next)
})
router.get(`${roleString}/:id`, (req, res, next)=> {
  roleController.get(req, res, next)
})

router.put(roleString, (req, res, next)=> {
  roleController.update(req, res, next)
})

router.delete(`${roleString}/:id`, (req, res, next)=> {
  roleController.del(req, res, next)
})


/* auth router ................................. */
const authString: string = '/auth'
router.post(authString, (req, res, next)=> {
  authController.add(req, res, next)
})
router.get(authString, (req, res, next)=> {
  authController.list(req, res, next)
})
router.get(`${authString}/:id`, (req, res, next)=> {
  authController.get(req, res, next)
})

router.put(authString, (req, res, next)=> {
  authController.update(req, res, next)
})

router.delete(`${authString}/:id`, (req, res, next)=> {
  authController.del(req, res, next)
})


/* roleAuth router ................................. */
const roleAuthString: string = '/roleAuth'
router.post(roleAuthString, (req, res, next)=> {
  roleAuthController.add(req, res, next)
})
router.get(roleAuthString, (req, res, next)=> {
  roleAuthController.list(req, res, next)
})
router.get(`${roleAuthString}/:id`, (req, res, next)=> {
  roleAuthController.get(req, res, next)
})

router.put(roleAuthString, (req, res, next)=> {
  roleAuthController.update(req, res, next)
})

router.delete(`${roleAuthString}/:id`, (req, res, next)=> {
  roleAuthController.del(req, res, next)
})

/* userRole router ................................. */
const userRoleString: string = '/userRole'
router.post(userRoleString, (req, res, next)=> {
  userRoleController.add(req, res, next)
})
router.get(userRoleString, (req, res, next)=> {
  userRoleController.list(req, res, next)
})
router.get(`${userRoleString}/:id`, (req, res, next)=> {
  userRoleController.get(req, res, next)
})

router.put(userRoleString, (req, res, next)=> {
  userRoleController.update(req, res, next)
})

router.delete(`${userRoleString}/:id`, (req, res, next)=> {
  userRoleController.del(req, res, next)
})


export default router