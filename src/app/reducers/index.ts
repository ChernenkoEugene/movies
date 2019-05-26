import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromApi from './movies-api';

import { environment } from '../../environments/environment';

export interface State {
  movies; //{}[]
}

export const reducers: ActionReducerMap<State> = {
  movies: fromApi.reducer,
};

export const getMoviesState = (state: State) => state.movies;
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
