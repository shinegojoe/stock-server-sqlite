import { Router } from 'express'
import stockInfoRouter from './stockInfo.route'
import stockListRouter from './stockList.route'

const router = Router()

router.use('/stockInfo', stockInfoRouter)
router.use('/stockList', stockListRouter)

export default router

