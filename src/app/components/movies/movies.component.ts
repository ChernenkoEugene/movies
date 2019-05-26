import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';

import * as fromRoot from '../../reducers/index';
import { Popup } from '../popup/popup';
import * as MoviesApi from '../../actions/movies-api';
import { PopupComponent } from '../popup/popup.component';
import { PopupModes } from '../popup/popup-modes';
import { mockMovie } from './mock-movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  private movies$: Observable<{}[]> = this.store.select(fromRoot.getMoviesState);
  private editMovie: {};
  private popup: Popup;
  private popupTitle: string;
  private PopupModes = PopupModes;
  private mockMovie = mockMovie;
  private films;

  constructor(public store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new MoviesApi.RequestMovies());
    this.movies$.subscribe(films => this.films = films);
  }

  private openPopup(movie: {}, mode) {
    console.log(this.films);
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
}

