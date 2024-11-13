import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-res-by-survey',
  templateUrl: './res-by-survey.component.html',
  styleUrls: ['./res-by-survey.component.scss'],
})
export class ResBySurveyComponent  implements OnInit {
  id!: null | number;
  responses = [];
  repsosesTranform: any[] = [];
  constructor(
    private _resposS: ResponseService,
    private _activeR: ActivatedRoute
  ) {

    this._activeR.params.subscribe(( params: any )=> {
      this.id = params['id'];
    })

   }

  ngOnInit() {
    this._resposS.getResponseByID(this.id).subscribe((res:any) => {
      console.log(res);

      this.repsosesTranform = res.reduce((acc: any, item: any) => {
        // Encuentra el objeto correspondiente al `school_users_id` en el acumulador.
        let userEntry = acc.find((entry: any) => entry.user_name === item.school_user.user_name);

        if (!userEntry) {
          // Si no existe, crea uno nuevo con el formato requerido.
          userEntry = { user_name: item.school_user.user_name, results: [] };
          acc.push(userEntry);
        }
        if(item.question.url === null || item.question.url === ''){
            userEntry.results.push({
            survey: item.survey,
            response: item.response,
            question: item.question
          });
        }

        // Agrega la entrada `survey`, `response` y `question` en el formato deseado.


        return acc;
      }, []);

      console.log(this.repsosesTranform);


    });
  }

}
