import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buttonColor'
})
export class ButtonColorPipe implements PipeTransform {
  transform(value: number): string {
    if(value === 1){
      return 'success';
    } else {
      return 'primary'
    }
  }


}
