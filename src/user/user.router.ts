import express from 'express'
import service from './user.service'
const router = express.Router()

router.get('/', service.root)

export default router
