import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { encuesta } from '../../interfaces/login.interface';
@Component({
  selector: 'app-presentar-encuesta',
  templateUrl: './presentar-encuesta.component.html',
  styleUrls: ['./presentar-encuesta.component.scss'],
})
export class PresentarEncuestaComponent  implements OnInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  encuesta: encuesta = {

  };
  id :any;
  constructor(
    private actRoute: ActivatedRoute,
    private route: Router,
    private encuestaS: EncuestasService
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.getEncuesta(this.id);

    })
   }

  ngOnInit() {}

  async getEncuesta(id: string) {
    this.encuestaS.getEncuesta(id).subscribe((encuesta: any) => {
      this.encuesta =  encuesta;
      console.log(encuesta);
    })
  }


}
