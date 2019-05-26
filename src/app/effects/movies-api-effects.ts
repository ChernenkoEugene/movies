import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, map, catchError } from 'rxjs/operators';

import { MoviesApiService } from '../shared/services/movies-api.service';
import * as MoviesApi from '../actions/movies-api';



@Injectable()
export class MoviesApiEffects {

  @Effect()
  requestMovies$: Observable<MoviesApi.MoviesApiAction> = this.actions$
    .pipe(
      ofType(MoviesApi.REQUEST_MOVIES),
      switchMap(actions => this.MoviesApiServ.getDefaultMoviesList()
        .pipe(
          mergeMap(movies => of(new MoviesApi.RecieveMovies(movies))),
          catchError(err => {
            console.log('err', err);
            return of(new MoviesApi.RequestFailed(err));
          })
        )
      )
    );

  @Effect()
  addMovie$: Observable<MoviesApi.MoviesApiAction> = this.actions$
    .pipe(
      ofType(MoviesApi.ADD_MOVIE),
      switchMap((action: MoviesApi.MoviesApiAction) => this.MoviesApiServ.addNewMovie(action.payload)
        .pipe(
          switchMap(movie => of(new MoviesApi.AddMovieSuccess(movie))),
          catchError(err => {
            console.log('err', err);
            return of(new MoviesApi.RequestFailed(err));
          })
        )
      )
    );

  @Effect()
  editMovie$: Observable<MoviesApi.MoviesApiAction> = this.actions$
  .pipe(
    ofType(MoviesApi.EDIT_MOVIE),
    switchMap((action: MoviesApi.MoviesApiAction) => this.MoviesApiServ.updateMovie(action.payload)
      .pipe(
        switchMap(movie => of(new MoviesApi.EditMovieSuccess(movie))),
        catchError(err => {
          console.log('err', err);
          return of(new MoviesApi.RequestFailed(err));
        })
      )
    )
  );

  @Effect()
  deleteMovie$: Observable<MoviesApi.MoviesApiAction> = this.actions$
  .pipe(
    ofType(MoviesApi.DELETE_MOVIE),
    switchMap((action: MoviesApi.MoviesApiAction) => this.MoviesApiServ.deleteMovie(action.payload)
      .pipe(
        switchMap(movie => of(new MoviesApi.DeleteMovieSuccess(movie))),
        catchError(err => {
          console.log('err', err);
          return of(new MoviesApi.RequestFailed(err));
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private MoviesApiServ: MoviesApiService
  ) { }
}
