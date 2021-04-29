import express from 'express'
import accountController from '../modules/account/controller/account.controller'
import registerController from '../modules/account/controller/register.controller'
import tokenValidation from '../validation/token.validation'

const router = express.Router()


// router.post('/login', (req,res, next)=> {
//   accountController.login(req, res, next)
// })

// router.post('/logout',(req, res, next)=> {
//   tokenValidation(req, res, next)
//   accountController.logout(req, res, next)
// })

// router.post('/register', (req,res, next)=> {
//   registerController.register(req, res, next)
// })



export default router