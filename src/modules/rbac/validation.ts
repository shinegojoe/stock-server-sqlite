import validationMiddleware from '../../validation/validationMiddleware'
import { body } from 'express-validator'


const addUser = [
  body('name').isString(),
  body('email').isEmail(),
  validationMiddleware
]

export default { addUser }
