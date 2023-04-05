import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../services/encuestas.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {

  encuestas: any [] = [];

  constructor(
    private encuestaS: EncuestasService
  ) { }

  ngOnInit() {
    this.encuestaS.getEncuestas().subscribe(
      (encuestas: any) => {
        console.log(encuestas);
        this.encuestas = encuestas;
      }
    )
  }

}
