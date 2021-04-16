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

export default router