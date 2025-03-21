import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// User routes
router.post('/email-signup', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/google-auth', UserController.googleAuth);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.get('/email/:email', UserController.getUserByEmail);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;