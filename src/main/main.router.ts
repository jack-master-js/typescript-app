import express from 'express'
import service from './main.service'
const router = express.Router()

router.get('/', service.root)

export default router
