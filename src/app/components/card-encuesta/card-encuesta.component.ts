import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-encuesta',
  templateUrl: './card-encuesta.component.html',
  styleUrls: ['./card-encuesta.component.scss'],
})
export class CardEncuestaComponent  implements OnInit {
@Input() encuesta: any = {};
@Input() i: any = 0;
  constructor(
    private _router: Router
  ) { }

  ngOnInit() {}

  goToSurvey(encuesta: any){
    if(!encuesta.realizado){
      this._router.navigateByUrl(`home/encuesta/instructions/${encuesta.id}`)
    }
  }

}
