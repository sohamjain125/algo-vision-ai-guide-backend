import { OpenAI } from 'openai';
import { IVisualizationRequest, IVisualizationResponse, AlgorithmType } from '../types/visualization.types';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined in environment variables');
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});


export async function generateVisualization(
  request: IVisualizationRequest
): Promise<IVisualizationResponse> {
  try {
    // Create a prompt for OpenAI
    const prompt = createPrompt(request);

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
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    return {
      steps: parseSteps(response),
      timeComplexity: "O(n)", // This should be extracted from the response
      spaceComplexity: "O(1)", // This should be extracted from the response
      explanation: response,
    };
  } catch (error) {
    throw new Error('Failed to generate visualization');
  }
}

function createPrompt(request: IVisualizationRequest): string {
  const { algorithmType, algorithm, input, speed } = request;
  return `Generate a step-by-step visualization for ${algorithm} (${algorithmType.toString()}) with the following input: ${JSON.stringify(input)}. 
  Please include:
  1. Each step of the algorithm
  2. The state of the data at each step
  3. Time complexity
  4. Space complexity
  5. A clear explanation of how the algorithm works
  ${speed ? `Animation speed: ${speed}` : ''}`;
}

function parseSteps(response: string): any[] {
  // This is a simplified version. In a real implementation, you would need to
  // properly parse the OpenAI response and structure it according to your needs
  return [
    {
      step: 1,
      description: "Initial state",
      data: {},
    },
    // Add more steps based on the algorithm
  ];
} 