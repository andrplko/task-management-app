export interface TodoItem {
  _id?: string;
  title: string;
  description: string;
  status: string;
}

export interface TodoResponse {
  results: TodoItem[];
  pagination: {
    count: number;
    page: number;
    pages: number;
  };
}

export type TodoAction = 'create' | 'update' | 'delete';
