export const taskStatuses: string[] = ['All', 'To Do', 'In Progress', 'Done'];
export const radioButtonOptions = [
  {
    value: 'To Do',
    labelClassName: 'todo',
    radioClassName: 'radio_todo',
  },
  {
    value: 'In Progress',
    labelClassName: 'in_progress',
    radioClassName: 'radio_in_progress',
  },
  {
    value: 'Done',
    labelClassName: 'done',
    radioClassName: 'radio_done',
  },
];
export const sortOptions: string[] = [
  'ASC by status',
  'DESC by status',
  'ASC by title',
  'DESC by title',
];
export const DEFAULT_PAGE = '1';
export const DEFAULT_PER_PAGE = '3';
export const DEFAULT_STATUS = 'All';
