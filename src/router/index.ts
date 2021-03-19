import { Router } from 'express'
import userRouter from './user.route'
import sceneRouter from './scene.route'

const router = Router()

router.use('/', userRouter)
router.use('/scene', sceneRouter)

export default router

