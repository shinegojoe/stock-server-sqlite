import express from 'express'
import googleLoginController from '../modules/login_signUp/google/google.controller'
import emailLoginController from '../modules/login_signUp/email/login.controller'
import { jwtMiddleware } from '../helper/jwtHelper/jwtMiddleware'

const router = express.Router()


const googleLoginString = '/googleLogin'
router.get(googleLoginString, (req, res, next)=> {
  googleLoginController.login(req, res, next)
})

router.post(googleLoginString, (req, res, next)=> {
  googleLoginController.getToken(req, res, next)
})

router.get('/callback', (req, res, next)=> {
  console.log(req.query)
  googleLoginController.getToken(req, res, next)

  // res.send('ok')
})




const loginString = '/login'
router.post(loginString, jwtMiddleware, (req, res, next)=> {
  emailLoginController.login(req, res, next)
})

// router.get('/loginTest', jwtMiddleware, (req, res, next) => {
//   emailLoginController.test(req, res, next)
// })


// router.get('/xxx', (req: any, res, next)=> {
//   console.log(req.session)
//   res.send('qq')
// })

export default router