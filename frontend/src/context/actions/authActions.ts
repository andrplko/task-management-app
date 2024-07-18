import { Dispatch } from 'react';
import { ActionType } from '@context/reducers/authReducer';
import { User } from '@types';

const setUser = (dispatch: Dispatch<ActionType>, payload: User | null) => {
  dispatch({ type: 'SET_USER', payload });
};

export { setUser };
