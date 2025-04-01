export enum AlgorithmType {
  SORTING = 'sorting',
  SEARCHING = 'searching',
  GRAPH = 'graph',
  TREE = 'tree',
  LINKED_LIST = 'linked-list',
  STACK = 'stack',
  QUEUE = 'queue',
  HEAP = 'heap'
}

export type SortingAlgorithm = 
  | 'bubble-sort'
  | 'quick-sort'
  | 'merge-sort'
  | 'insertion-sort'
  | 'selection-sort'
  | 'heap-sort';

export type SearchingAlgorithm = 
  | 'binary-search'
  | 'linear-search';

export type GraphAlgorithm = 
  | 'dfs'
  | 'bfs'
  | 'dijkstra'
  | 'kruskal'
  | 'prim';

export type TreeAlgorithm = 
  | 'inorder'
  | 'preorder'
  | 'postorder'
  | 'level-order';

export interface IVisualizationRequest {
  algorithmType: AlgorithmType;
  algorithm: SortingAlgorithm | SearchingAlgorithm | GraphAlgorithm | TreeAlgorithm;
  input: number[] | string[] | Record<string, any>;
  speed?: 'slow' | 'medium' | 'fast';
}

export interface IVisualizationStep {
  step: number;
  description: string;
  data: any;
  highlights?: number[];
}

export interface IVisualizationResponse {
  steps: IVisualizationStep[];
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}

export interface ISavedVisualization {
  _id: string;
  userId: string;
  request: IVisualizationRequest;
  response: IVisualizationResponse;
  createdAt: Date;
  title?: string;
  description?: string;
} 