import mongoose, { Schema, Document } from 'mongoose';
import { IVisualizationRequest, IVisualizationResponse, ISavedVisualization } from '../types/visualization.types';

type IVisualizationDocument = Omit<ISavedVisualization, '_id'> & Document;

const visualizationSchema = new Schema<IVisualizationDocument>(
  {
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
    request: {
      algorithmType: { type: String, required: true },
      algorithm: { type: String, required: true },
      input: { type: Schema.Types.Mixed, required: true },
      speed: { type: String, enum: ['slow', 'medium', 'fast'] },
    },
    response: {
      steps: [{
        step: { type: Number, required: true },
        description: { type: String, required: true },
        data: { type: Schema.Types.Mixed, required: true },
        highlights: [{ type: Number }],
      }],
      timeComplexity: { type: String, required: true },
      spaceComplexity: { type: String, required: true },
      explanation: { type: String, required: true },
    },
    title: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
visualizationSchema.index({ userId: 1, createdAt: -1 });

export const Visualization = mongoose.model<IVisualizationDocument>(
  'Visualization',
  visualizationSchema
); 