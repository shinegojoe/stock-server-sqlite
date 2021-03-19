import express from 'express'
import userController from '../controller/user.controller'
import contoller from '../controller/user.controller'

const router = express.Router()

// router.get('/', (req, res, next)=> {
//   res.send('this is user !!');
// })
router.route('/user').get((req, res, next)=> {
  res.send("this is user!")
})

router.route('/users').get(userController.users)
export default router