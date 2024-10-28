import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestasService } from 'src/app/services/encuestas.service';

@Component({
  selector: 'app-primervideo',
  templateUrl: './primervideo.component.html',
  styleUrls: ['./primervideo.component.scss'],
})
export class PrimervideoComponent  implements OnInit {
  id: string = '';
  survey: any = {};

  constructor(
    private _activeR: ActivatedRoute,
    private _surveyS: EncuestasService,
    private _router: Router
  ) {
    this._activeR.params.subscribe(params => {
      console.log(params);
      this.id = params['id'];
      this._surveyS.getEncuesta(this.id).subscribe(survey => {
        this.survey = survey;

      })

    });
  }

  presentarEncuesta(){
    // console.log(this.miVideo);
    // this.miVideo.nativeElement.pause();
    this._router.navigateByUrl(`home/encuesta/ver/${this.id}/presentar`);
  }


  ngOnInit() {}

}
