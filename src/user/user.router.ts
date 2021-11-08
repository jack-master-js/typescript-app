import express from 'express';
import service from './user.service';
const router = express.Router();

// /api/users
router.get('/', service.getUser);
router.post('/', service.saveUser);
router.patch('/', service.updateUser);
router.delete('/', service.deleteUser);
router.get('/list', service.getUserList);
router.delete('/list', service.deleteUserList);
router.get('/list/export', service.exportUserList);

export default router;
