import { Action } from '@ngrx/store';

export const REQUEST_MOVIES = '[Db] Request movies';
export const RECIEVE_MOVIES = '[Db] Recieve movies';
export const ADD_MOVIE = '[Db] Add movie';
export const ADD_MOVIE_SUCCESS = '[Db] Add movie success';
export const EDIT_MOVIE = '[Db] Edit movie';
export const EDIT_MOVIE_SUCCESS = '[Db] Edit movie success';
export const DELETE_MOVIE = '[Db] Delete movie';
export const DELETE_MOVIE_SUCCESS = '[Db] Delete movie success';
export const REQUEST_FAILED = '[Db] Request failed';

export interface MoviesApiAction extends Action {
  payload?: any;
}

export class RequestMovies implements MoviesApiAction {
  readonly type = REQUEST_MOVIES;
}

export class RecieveMovies implements MoviesApiAction {
  readonly type = RECIEVE_MOVIES;

  constructor(public payload: {}[]) { }
}

export class AddMovie implements MoviesApiAction {
  readonly type = ADD_MOVIE;

  constructor(public payload: any) { }
}

export class AddMovieSuccess implements MoviesApiAction {
  readonly type = ADD_MOVIE_SUCCESS;

  constructor(public payload: any) { }
}

export class EditMovie implements MoviesApiAction {
  readonly type = EDIT_MOVIE;

  constructor(public payload: any) { }
}

export class EditMovieSuccess implements MoviesApiAction {
  readonly type = EDIT_MOVIE_SUCCESS;

  constructor(public payload) { }
}

export class DeleteMovie implements MoviesApiAction {
  readonly type = DELETE_MOVIE;

  constructor(public payload: any) { }
}

export class DeleteMovieSuccess implements MoviesApiAction {
  readonly type = DELETE_MOVIE_SUCCESS;

  constructor(public payload: any) { }
}

export class RequestFailed implements MoviesApiAction {
  readonly type = REQUEST_FAILED;

  constructor(public error: any) { }
}

export type Actions =
  | RequestMovies
  | RecieveMovies
  | AddMovie
  | AddMovieSuccess
  | EditMovie
  | EditMovieSuccess
  | DeleteMovie
  | DeleteMovieSuccess
  | RequestFailed;
