import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

const MOVIE_ID_KEY = 'imdbID';
const MOVIE_TITLE_KEY = 'Title';
@Directive({
  selector: '[appTitlesValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: TitlesValidatorDirective,
    multi: true
  }]
})
export class TitlesValidatorDirective implements Validator {
  @Input('appTitlesValidator') movies: {}[];

  @Input()
  editMovie: {};

  validate(control: FormControl) {
    const currentId = String(this.editMovie[MOVIE_ID_KEY]);
    const value = control.value ? control.value.trim() : '';

    function mathces(item, index, array) {
      return item[MOVIE_TITLE_KEY] === value && currentId !== item[MOVIE_ID_KEY];
    }

    const hasTitle = this.movies.some(mathces);

    return hasTitle
      ? { duplicateTitles: true }
      : null;
  }
}
