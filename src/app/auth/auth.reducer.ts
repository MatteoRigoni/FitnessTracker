import { Action } from '@ngrx/store';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false,
      };
    default:
      return initialState;
  }
}

export const getIsAuhenticated = (state: State) => state.isAuthenticated;
