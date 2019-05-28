import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as moviesApi from '../../actions/movies-api';
import * as fromRoot from '../../reducers/index';
import { Popup } from './popup';
import { PopupModes } from '../popup/popup-modes';
import { TitlesValidatorDirective as TitlesValidator } from '../../shared/directives/titles-validator.directive';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  private PopupModes = PopupModes;

  @Input()
  editMovie: {};

  @Input()
  movies: {};

  @Input()
  popup: Popup;

  @Input()
  popupTitle: string;

  constructor(public store: Store<fromRoot.State>) {}

  ngOnInit() {
  }

  private save(e) {
    e.preventDefault();
    if (this.popup.mode === this.PopupModes.ADD) {
      this.addNewMovie(this.editMovie);
    }
    if (this.popup.mode === this.PopupModes.EDIT) {
      this.updateMovie(this.editMovie);
    }
    if (this.popup.mode === this.PopupModes.DELETE) {
      this.deleteMovie(this.editMovie);
    }
    this.popup.open = false;
  }
  private addNewMovie(newMovie) {
    if (!this.isValid(newMovie)) { return; }
    this.store.dispatch(new moviesApi.AddMovie(newMovie));
  }
  private updateMovie(movie) {
    if (!this.isValid(movie)) { return; }
    this.store.dispatch(new moviesApi.EditMovie(movie));
  }
  private deleteMovie(movie) {
    this.store.dispatch(new moviesApi.DeleteMovie(movie));
  }
  private cancel() {
    this.popup.open = false;
  }
  private isValid(movie) {
    return true;
  }
}
