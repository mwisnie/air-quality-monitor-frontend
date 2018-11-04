import * as fromAuthEffects from '../authentication/store/auth.effects';
import * as fromAuthReducers from '../authentication/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  authState: fromAuthReducers.AuthState;
}

export const appEffects = [
  fromAuthEffects.AuthEffects
];

export const appReducers: ActionReducerMap<AppState> = {
  authState: fromAuthReducers.authReducer,
};
