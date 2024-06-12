export const BASE_URL = import.meta.env.VITE_API_URL;

export const taskStatuses: string[] = ['All', 'To Do', 'In Progress', 'Done'];
export const sortOptions: string[] = [
  'ASC by status',
  'DESC by status',
  'ASC by title',
  'DESC by title',
];
export const DEFAULT_PAGE = '1';
export const DEFAULT_PER_PAGE = '3';
export const DEFAULT_STATUS = 'All';
