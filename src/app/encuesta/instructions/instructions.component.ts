import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { encuesta } from 'src/app/interfaces/login.interface';
import { EncuestasService } from 'src/app/services/encuestas.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
})
export class InstructionsComponent  implements OnInit {
  id: string = '';
  constructor(private _activeR: ActivatedRoute,
    private _surveyS: EncuestasService,
    private _router: Router

  ) { }

  ngOnInit() {
    this._activeR.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  firstVideo(id: string){
    this._router.navigate([`home/encuesta/ver/${id}/presentar`]);
  }

}
