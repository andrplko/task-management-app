import {
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  useReducer,
  useMemo,
} from 'react';
import { ActionType, formModalReducer } from './reducers/formModalReducer';
import { TodoItem } from '../types';

export enum ModalMode {
  Create = 'create',
  Edit = 'edit',
}

export interface InitialState {
  isOpen: boolean;
  mode: ModalMode;
  todo: TodoItem;
}

const initialState: InitialState = {
  isOpen: false,
  mode: ModalMode.Create,
  todo: {
    _id: '',
    title: '',
    description: '',
    status: '',
  },
};

const FormModalContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

const useFormModalContext = () => {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error(
      'useFormModalContext must be used within a FormModalProvider'
    );
  }
  return context;
};

const FormModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(formModalReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <FormModalContext.Provider value={value}>
      {children}
    </FormModalContext.Provider>
  );
};

export { useFormModalContext, FormModalProvider };
