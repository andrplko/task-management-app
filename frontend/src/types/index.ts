import { Method } from 'axios';

export interface User {
  _id?: string;
  username: string;
  email: string;
  createdAt: string;
}

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

export interface ErrorResponse {
  name: string;
  message: string;
}

export type TodoAction = 'create' | 'update' | 'delete';

export interface RequestParams {
  url: string;
  method: Method | string;
  params?: unknown;
  body?: unknown;
  headers?: Record<string, string>;
}
