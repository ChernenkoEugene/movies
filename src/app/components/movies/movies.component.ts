import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, from } from 'rxjs';

import * as fromRoot from '../../reducers/index';
import { Popup } from '../popup/popup';
import * as MoviesApi from '../../actions/movies-api';
import { PopupComponent } from '../popup/popup.component';
import { PopupModes } from '../popup/popup-modes';
import { mockMovie } from './mock-movie';

const TITLE_KEY = 'Title';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  private movies$: Observable<{}[]> = this.store.select(fromRoot.getMoviesState);
  private movies: {}[] = [];
  private editMovie: {};
  private popup: Popup;
  private popupTitle: string;
  private PopupModes = PopupModes;
  private mockMovie = mockMovie;
  private moviesSubscription: Subscription;

  constructor(public store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new MoviesApi.RequestMovies());
    this.moviesSubscription = this.movies$.subscribe(movies => this.movies = movies);
  }

  private openPopup(movie: {}, mode) {
    this.editMovie = Object.assign({}, movie);
    this.popupTitle = mode.title;
    this.popup = {
      open: true,
      mode
    };
  }
  private closePopup() {
    this.popup.open = false;
  }

  ngOnDestroy() {
    this.moviesSubscription.unsubscribe();
  }
}

