import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { DEFAULT_MOVIES } from './default-movies';
import { API_CONFIG } from './api-config';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {
  private moviesList = [];

  constructor(private http: HttpClient) {
    DEFAULT_MOVIES.forEach(movie => this.getMovieByTitle(movie).subscribe(item => this.moviesList.push(item)));
   }

  private buildRequestUrl(searchData: string) {
    searchData = searchData.trim().split(' ').join('+');
    return `${API_CONFIG.BASE_URL}?${API_CONFIG.SEARCH_PARAMETER_TITLE}=${searchData}&apikey=${API_CONFIG.API_KEY}`;
  }

  public getDefaultMoviesList(): Observable<{}[]> {
    return of(this.moviesList);
  }

  public getMovieByTitle(movieTitle: string): Observable<{}> {
    return this.http.get<{}>(this.buildRequestUrl(movieTitle))
      .pipe(retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  public addNewMovie(movie): Observable<{}> {
    // temporary solution as we work locally and need to take ID's somewhere(for further proper updating/deleting);
    movie.imdbID = Date.now();
    return of(movie);
  }

  public updateMovie(movie): Observable<{}> {
    return of(movie);
  }

  public deleteMovie(movie): Observable<{}> {
    return of(movie);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      // console.log(error)
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
