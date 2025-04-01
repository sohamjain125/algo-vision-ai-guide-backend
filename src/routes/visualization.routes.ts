import { Router } from 'express';
import { VisualizationController } from '../controllers/visualization.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { schemas } from '../middleware/validation.middleware';

const router = Router();
const visualizationController = new VisualizationController();

// All routes are protected
router.use(protect);

router.post(
  '/',
  validate(schemas.visualization.create),
  visualizationController.createVisualization
);

router.get(
  '/',
  visualizationController.getUserVisualizations
);

router.get(
  '/:id',
  visualizationController.getVisualization
);

router.delete(
  '/:id',
  visualizationController.deleteVisualization
);

export default router; 