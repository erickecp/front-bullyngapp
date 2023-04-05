import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestasService } from '../../services/encuestas.service';
import { encuesta } from '../../interfaces/login.interface';

@Component({
  selector: 'app-ver-encuesta',
  templateUrl: './ver-encuesta.component.html',
  styleUrls: ['./ver-encuesta.component.scss'],
})
export class VerEncuestaComponent  implements OnInit {
  id = '';
  tiempoTranscurrido: any;
  @ViewChild('miVideo') miVideo!: ElementRef;
  encuesta: encuesta = {

  };

  data = {
    image: 'assets/products/shoe-ad.png',
    label: 'Sneakers',
    category: 'New Collection',
    gradient: 'blue_to_pink'
  };
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

  ngOnInit() {
  }

  actualizarTiempoTranscurrido() {
    this.tiempoTranscurrido = this.miVideo.nativeElement.currentTime;
  }

  presentarEncuesta(){
    console.log(this.miVideo);
    this.miVideo.nativeElement.pause();
    this.route.navigateByUrl(`home/encuesta/ver/${this.id}/presentar`);
  }




  async getEncuesta(id: string) {
    this.encuestaS.getEncuesta(id).subscribe((encuesta: any) => {
      this.encuesta =  encuesta;
      console.log(encuesta);
    })
  }
}
