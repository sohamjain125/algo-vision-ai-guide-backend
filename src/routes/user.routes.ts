import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { schemas } from '../middleware/validation.middleware';

const router = Router();
const userController = new UserController();

// Public routes
router.post(
  '/register',
  validate(schemas.user.register),
  userController.register
);

router.post(
  '/login',
  validate(schemas.user.login),
  userController.login
);

// Protected routes
router.use(protect);

router.get('/me', userController.getCurrentUser);

router.patch(
  '/:id',
  validate(schemas.user.register),
  userController.updateUser
);

router.delete('/:id', userController.deleteUser);

export default router; 