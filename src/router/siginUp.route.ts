import express from 'express'
import emailSignUpController from '../modules/login_signUp/email/signup.controller'

const router = express.Router()


const googleSignUpString = '/googleSignUp'
router.post(googleSignUpString, (req, res, next)=> {

})

const signUpString = '/signUp'
router.post(signUpString, (req, res, next)=> {
  emailSignUpController.signIn(req, res, next)
})


const fbSignUpString = '/fbSignUp'
router.post(fbSignUpString, (req, res, next)=> {

})

export default router
