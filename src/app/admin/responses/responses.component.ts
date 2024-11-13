import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncuestasService } from 'src/app/services/encuestas.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
})
export class ResponsesComponent  implements OnInit {
  encuestas: any [] = [];
  constructor(
    private _surveyS: EncuestasService,
    private _router: Router
  ) {
    this.getEncuestas();
  }

  ngOnInit() {}

  verResultados(enc: any){
    console.log(enc);
    this._router.navigateByUrl('/home/admin/response/' + enc.id)
    // TODO: Implementar la lógica para ver los resultados de la encuesta.
  }

  getEncuestas(){
    return this._surveyS.getEncuestas().subscribe({
      next: (encuestas: any) => {
        console.log(encuestas);
        this.encuestas = encuestas;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
