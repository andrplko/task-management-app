import { User } from '@types';

export interface State {
  user: User | null;
}

export interface ActionType {
  type: string;
  payload: User | null;
}

const authReducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { authReducer };
