import express from 'express'
import emailSignInController from '../modules/login_signin/email/signIn.controller'

const router = express.Router()


const googleSignInString = '/googleSignIn'
router.post(googleSignInString, (req, res, next)=> {

})

const signInString = '/signIn'
router.post(signInString, (req, res, next)=> {
  emailSignInController.signIn(req, res, next)
})


const fbSignInString = '/fbSignIn'
router.post(fbSignInString, (req, res, next)=> {

})

export default router
