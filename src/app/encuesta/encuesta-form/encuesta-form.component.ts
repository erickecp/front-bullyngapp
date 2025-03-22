import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-form',
  templateUrl: './encuesta-form.component.html',
  styleUrls: ['./encuesta-form.component.scss'],
})
export class EncuestaFormComponent  implements OnInit {

  constructor() { }
  private _router = inject(Router);
  private _activeR= inject(ActivatedRoute);
 id: any;
 isFinal = false;
  ngOnInit() {
    this._activeR.params.subscribe((params: any) => {
      console.log(params);

      this.id = params['id'];
      if(params['f']){
        this.isFinal = true;
      }
    });
  }

  firstVideo(id: string){
    console.log('Holaaa');
      if(this.isFinal){
        this._router.navigate([`home/encuesta`]);
        return;
      }
     this._router.navigate([`home/encuesta/ver/${id}/presentar`]);
  }

}
