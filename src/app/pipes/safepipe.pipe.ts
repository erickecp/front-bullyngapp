import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitize'
})
export class DomSanitizePipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer) {}

  transform(img: string): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`${img}?rel=0`);
  }

}
