import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphaNumPipe'
})
export class AlphaNumPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/[\W_]/g, '');
  }

}
