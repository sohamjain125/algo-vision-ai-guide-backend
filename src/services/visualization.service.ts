import { Visualization } from '../models/visualization.model';
import { IVisualizationRequest, IVisualizationResponse, ISavedVisualization } from '../types/visualization.types';
import { AppError } from '../types/error.types';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class VisualizationService {
  static async createVisualization(
    userId: string,
    request: IVisualizationRequest
  ): Promise<ISavedVisualization> {
    try {
      // Generate visualization using OpenAI
      const response = await this.generateVisualization(request);

      // Save visualization
      const visualization = await Visualization.create({
        userId,
        request,
        response,
      });

      return visualization;
    } catch (error) {
      throw new AppError(
        'Failed to create visualization',
        500
      );
    }
  }

  static async getVisualization(
    userId: string,
    visualizationId: string
  ): Promise<ISavedVisualization> {
    const visualization = await Visualization.findOne({
      _id: visualizationId,
      userId,
    });

    if (!visualization) {
      throw new AppError('Visualization not found', 404);
    }

    return visualization;
  }

  static async getUserVisualizations(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ visualizations: ISavedVisualization[]; total: number }> {
    const skip = (page - 1) * limit;
    const [visualizations, total] = await Promise.all([
      Visualization.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Visualization.countDocuments({ userId }),
    ]);

    return { visualizations, total };
  }

  static async deleteVisualization(
    userId: string,
    visualizationId: string
  ): Promise<void> {
    const visualization = await Visualization.findOneAndDelete({
      _id: visualizationId,
      userId,
    });

    if (!visualization) {
      throw new AppError('Visualization not found', 404);
    }
  }

  private static async generateVisualization(
    request: IVisualizationRequest
  ): Promise<IVisualizationResponse> {
    try {
      // Create a prompt for OpenAI
      const prompt = this.createPrompt(request);

      // Get response from OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert in data structures and algorithms. Generate a step-by-step visualization of the requested algorithm."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      // Parse and structure the response
      const response = completion.choices[0].message.content;
      return this.parseVisualizationResponse(response, request);
    } catch (error) {
      throw new AppError(
        'Failed to generate visualization',
        500
      );
    }
  }

  private static createPrompt(request: IVisualizationRequest): string {
    const { algorithmType, algorithm, input, speed } = request;
    return `Generate a step-by-step visualization for ${algorithm} (${algorithmType}) with the following input: ${JSON.stringify(input)}. 
    Please include:
    1. Each step of the algorithm
    2. The state of the data at each step
    3. Time complexity
    4. Space complexity
    5. A clear explanation of how the algorithm works
    ${speed ? `Animation speed: ${speed}` : ''}`;
  }

  private static parseVisualizationResponse(
    response: string,
    request: IVisualizationRequest
  ): IVisualizationResponse {
    // This is a simplified version. In a real implementation, you would need to
    // properly parse the OpenAI response and structure it according to your needs
    return {
      steps: [
        {
          step: 1,
          description: "Initial state",
          data: request.input,
        },
        // Add more steps based on the algorithm
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation: response,
    };
  }
} 