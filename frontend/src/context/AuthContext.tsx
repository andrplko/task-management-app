import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { ActionType, State, authReducer } from './reducers/authReducer';

const initialState: State = {
  user: null,
};

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<{
  state: State;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuthContext must be used within a AuthContextProvider`);
  }

  return context;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthContextProvider };
