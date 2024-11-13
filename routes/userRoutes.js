import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:email', userController.getUserByEmail);
router.put('/:id/role', userController.updateUserRole);
router.put('/:id/suspender', userController.suspenderUsuario);
router.delete('/:id', userController.deleteUser);


export default router;
