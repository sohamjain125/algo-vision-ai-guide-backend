import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { schemas } from '../middleware/validation.middleware';

const router = Router();

// Public routes
router.post(
  '/register',
  validate(schemas.user.register),
  UserController.register
);

router.post(
  '/login',
  validate(schemas.user.login),
  UserController.login
);

// Protected routes
router.use(protect);

router.get('/me', UserController.getCurrentUser);

router.patch(
  '/:id',
  validate(schemas.user.register),
  UserController.updateUser
);

router.delete('/:id', UserController.deleteUser);

export default router; 