import React, { useReducer, useMemo } from 'react';
import { FormInstance } from 'antd';
import { createContext } from '~/libs/react/context';

enum Action {
  SET_FORM = 'SET_FORM',
}

type SetFormAction = {
  type: Action.SET_FORM;
  payload: FormInstance | null;
};

export type ActionType = SetFormAction;

interface InjectState {
  $form: FormInstance | null;
}

interface InjectContext extends InjectState {
  dispatch: React.Dispatch<any>;
  setForm: (form: FormInstance | null) => void;
}

const initialState: InjectState = {
  $form: null,
};

const [Provider, useInjectContext] = createContext<InjectContext>({
  name: 'useInjectContext',
  errorMessage: 'useInjectContext: "context" is undefined.',
  defaultValue: initialState,
});

interface Props {
  children: React.ReactNode;
}

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case Action.SET_FORM:
      return {
        ...state,
        $form: action.payload,
      };
    default:
      return state;
  }
}

function InjectProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setForm = (form: FormInstance | null) => {
    dispatch({
      type: Action.SET_FORM,
      payload: form,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      setForm,
      dispatch,
    }),
    [state],
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { InjectProvider, useInjectContext };
