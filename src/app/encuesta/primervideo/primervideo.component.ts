import { map } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestasService } from 'src/app/services/encuestas.service';

@Component({
  selector: 'app-primervideo',
  templateUrl: './primervideo.component.html',
  styleUrls: ['./primervideo.component.scss'],
})
export class PrimervideoComponent  implements OnInit {
  @Output() datosEnviados = new EventEmitter<boolean>();
  @Input() video: null | string = '';
  videoLoaded = false;
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

  isNextButtonEnabled = false;

  playVideo(video: HTMLVideoElement): void {
    video.play();
  }

  onVideoEnded(): void {
    this.isNextButtonEnabled = true;
    this.datosEnviados.emit(this.isNextButtonEnabled);
  }

  ngOnInit() {}

}
