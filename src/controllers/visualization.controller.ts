import { Request, Response, NextFunction } from 'express';
import { VisualizationService } from '../services/visualization.service';
import { IVisualizationRequest } from '../types/visualization.types';

export class VisualizationController {
  static async createVisualization(
    req: Request<{}, {}, IVisualizationRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const visualization = await VisualizationService.createVisualization(
        req.user._id,
        req.body
      );
      res.status(201).json({
        status: 'success',
        data: { visualization },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getVisualization(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const visualization = await VisualizationService.getVisualization(
        req.user._id,
        req.params.id
      );
      res.status(200).json({
        status: 'success',
        data: { visualization },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserVisualizations(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await VisualizationService.getUserVisualizations(
        req.user._id,
        page,
        limit
      );

      res.status(200).json({
        status: 'success',
        data: result,
        pagination: {
          page,
          limit,
          total: result.total,
          pages: Math.ceil(result.total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteVisualization(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await VisualizationService.deleteVisualization(
        req.user._id,
        req.params.id
      );
      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
} 