import express from 'express';
import { VisualizationController } from '../controllers/visualization.controller';
import { validate } from '../middleware/validation.middleware';
import { createVisualizationSchema } from '../schemas/visualization.schema';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Create a new visualization
router.post(
  '/',
  protect,
  validate(createVisualizationSchema),
  VisualizationController.createVisualization
);

// Get all visualizations for the current user
router.get(
  '/',
  protect,
  VisualizationController.getUserVisualizations
);

// Get a specific visualization
router.get(
  '/:id',
  protect,
  VisualizationController.getVisualization
);

// Delete a visualization
router.delete(
  '/:id',
  protect,
  VisualizationController.deleteVisualization
);

export default router; 