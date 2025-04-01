import { z } from 'zod';
import { AlgorithmType } from '../types/visualization.types';

export const createVisualizationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  algorithmType: z.nativeEnum(AlgorithmType),
  algorithm: z.string().min(1, 'Algorithm is required'),
  inputData: z.any(),
  speed: z.number().min(1).max(10).optional(),
}); 