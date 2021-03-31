import { Router } from 'express'
import stockInfoRouter from './stockInfo.route'
import stockListRouter from './stockList.route'
import rbacRouter from './rbac.route'

const router = Router()

router.use('/stockInfo', stockInfoRouter)
router.use('/stockList', stockListRouter)
router.use('/', rbacRouter)


export default router

