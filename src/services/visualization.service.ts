import { Visualization } from '../models/visualization.model';
import { IVisualizationRequest, IVisualizationResponse, ISavedVisualization } from '../types/visualization.types';
import { AppError } from '../types/error.types';
import OpenAI from 'openai';
import { generateVisualization } from '../utils/visualization.generator';
import { Document } from 'mongoose';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type IVisualizationDocument = Omit<ISavedVisualization, '_id'> & Document;

export class VisualizationService {
  static async createVisualization(
    userId: string,
    data: IVisualizationRequest
  ): Promise<IVisualizationResponse> {
    const visualization = await Visualization.create({
      ...data,
      userId,
    });

    return this.parseVisualizationResponse(visualization.toObject());
  }

  static async getVisualization(
    userId: string,
    id: string
  ): Promise<IVisualizationResponse> {
    const visualization = await Visualization.findOne({
      _id: id,
      userId,
    });

    if (!visualization) {
      throw new AppError('Visualization not found', 404);
    }

    return this.parseVisualizationResponse(visualization.toObject());
  }

  static async getUserVisualizations(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ visualizations: IVisualizationResponse[]; total: number }> {
    const skip = (page - 1) * limit;
    const [visualizations, total] = await Promise.all([
      Visualization.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Visualization.countDocuments({ userId }),
    ]);

    return {
      visualizations: visualizations.map((v) => this.parseVisualizationResponse(v.toObject())),
      total,
    };
  }

  static async deleteVisualization(userId: string, id: string): Promise<void> {
    const visualization = await Visualization.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!visualization) {
      throw new AppError('Visualization not found', 404);
    }
  }

  static async generateVisualization(
    request: IVisualizationRequest
  ): Promise<IVisualizationResponse> {
    try {
      const response = await generateVisualization(request);
      
      if (!response) {
        throw new AppError('Failed to generate visualization', 500);
      }

      return response;
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : 'Failed to generate visualization',
        500
      );
    }
  }

  private static parseVisualizationResponse(
    visualization: Omit<ISavedVisualization, '_id'> & Document
  ): IVisualizationResponse {
    return {
      steps: visualization.response.steps,
      timeComplexity: visualization.response.timeComplexity,
      spaceComplexity: visualization.response.spaceComplexity,
      explanation: visualization.response.explanation,
    };
  }
} 