import express from 'express'
import service from './user.service'
const router = express.Router()

router.get('/', service.getUser)
router.post('/', service.saveUser)
router.patch('/', service.updateUser)
router.delete('/', service.deleteUser)
router.get('/list', service.getUserList)
router.delete('/list', service.deleteUserList)

export default router
