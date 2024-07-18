import { ModalMode, State } from '../FormModalContext';
import { TodoItem } from '@types';

export enum Types {
  SET_IS_OPEN = 'SET_IS_OPEN',
  SET_MODE = 'SET_MODE',
  SET_TODO = 'SET_TODO',
}

export type ActionType =
  | { type: Types.SET_IS_OPEN; payload: boolean }
  | { type: Types.SET_MODE; payload: ModalMode }
  | { type: Types.SET_TODO; payload: TodoItem }
  | Record<string, never>;

const formModalReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case Types.SET_IS_OPEN:
      return { ...state, isOpen: action.payload };
    case Types.SET_MODE:
      return { ...state, mode: action.payload };
    case Types.SET_TODO:
      return { ...state, todo: action.payload };
    default:
      return state;
  }
};

export { formModalReducer };
