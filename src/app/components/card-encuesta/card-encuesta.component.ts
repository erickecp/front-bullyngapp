import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-encuesta',
  templateUrl: './card-encuesta.component.html',
  styleUrls: ['./card-encuesta.component.scss'],
})
export class CardEncuestaComponent  implements OnInit {
@Input() encuesta: any = {};
  constructor(
    private _router: Router
  ) { }

  ngOnInit() {}

  goToSurvey(id: number){
    this._router.navigateByUrl(`home/encuesta/instructions/${id}`)
  }

}
