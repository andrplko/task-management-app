import { Dispatch } from 'react';
import { ActionType, Types } from '../reducers/formModalReducer';
import { ModalMode } from '../FormModalContext';
import { TodoItem } from '@types';

const setIsOpen = (dispatch: Dispatch<ActionType>, payload: boolean) => {
  dispatch({ type: Types.SET_IS_OPEN, payload });
};

const setMode = (dispatch: Dispatch<ActionType>, payload: ModalMode) => {
  dispatch({ type: Types.SET_MODE, payload });
};

const setTodo = (dispatch: Dispatch<ActionType>, payload: TodoItem) => {
  dispatch({ type: Types.SET_TODO, payload });
};

export { setIsOpen, setMode, setTodo };
