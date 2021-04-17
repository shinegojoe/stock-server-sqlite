import express from 'express'
import  googleLoginController from '../modules/login/google/google.controller'

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

router.get('/xxx', (req: any, res, next)=> {
  console.log(req.session)
  res.send('qq')
})

export default router