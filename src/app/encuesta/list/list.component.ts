import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../services/encuestas.service';
import { ResponseService } from 'src/app/services/response.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {

  encuestas: any [] = [];
  constestadas: any[] = [];
  user: any = {};

  constructor(
    private encuestaS: EncuestasService,
    private _respS: ResponseService,
    private _authS: AuthService,
  ) { }

  ngOnInit() {
    this.user = this._authS.getUser();
    if(this.user){
      this.getEncuentas();
      this.getUserSurveys();
    }




  }

  combination(){
    const combination = this.encuestas.map((enc:any) =>{
      const contestada = this.constestadas.some((e:any) => {
        return e.id == enc.id
      })
      return { ...enc , realizado : contestada };
    });
    console.log(combination);
    this.encuestas = combination;
  }


  getEncuentas(){
    this.encuestaS.getEncuestas().subscribe(
      (encuestas: any) => {
        console.log(encuestas);
        this.encuestas = encuestas;
        this.encuestas.splice(4)
      }
    )
  }

  getUserSurveys(){
    this._respS.getUserSurveys(this.user.id).subscribe((surveys: any) => {
      console.log('Encuestas respondidas', surveys);
      this.constestadas = surveys;
      this.combination();

    });
  }

}
