import mongoose, { Schema } from 'mongoose';
import { ISavedVisualization } from '../types/visualization.types';

const visualizationSchema = new Schema<ISavedVisualization>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    request: {
      algorithmType: {
        type: String,
        required: true,
        enum: ['sorting', 'searching', 'graph', 'tree', 'linked-list', 'stack', 'queue', 'heap'],
      },
      algorithm: {
        type: String,
        required: true,
      },
      input: {
        type: Schema.Types.Mixed,
        required: true,
      },
      speed: {
        type: String,
        enum: ['slow', 'medium', 'fast'],
      },
    },
    response: {
      steps: [{
        step: Number,
        description: String,
        data: Schema.Types.Mixed,
        highlights: [Number],
      }],
      timeComplexity: String,
      spaceComplexity: String,
      explanation: String,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
visualizationSchema.index({ userId: 1, createdAt: -1 });

export const Visualization = mongoose.model<ISavedVisualization>('Visualization', visualizationSchema); 