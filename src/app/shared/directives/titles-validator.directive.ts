import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[appTitlesValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: TitlesValidatorDirective,
    multi: true
  }]
})
export class TitlesValidatorDirective implements Validator {
  @Input('appTitlesValidator') titles: string[];

  validate(control: FormControl) {
    const hasTitle = this.titles.indexOf(control.value) > -1;

    return hasTitle
      ? { duplicateTitles: true }
      : null;
  }
}
