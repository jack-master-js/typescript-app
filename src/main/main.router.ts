import express from 'express'
import service from './main.service'
const router = express.Router()

router.get('/', service.home)

export default router
