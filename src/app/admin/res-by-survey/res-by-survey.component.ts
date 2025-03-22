import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from 'src/app/services/response.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';


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


  exportToExcel(): void {
    // Agrupamos los datos por encuesta
    const groupedData = this.groupDataBySurvey();

    groupedData.forEach(({ surveyTitle, rows }) => {
      // Paso 1: Crear la hoja de trabajo
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);

      // Paso 2: Crear el libro
      const workbook: XLSX.WorkBook = { Sheets: { 'Encuesta': worksheet }, SheetNames: ['Encuesta'] };

      // Paso 3: Generar el archivo Excel
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      // Paso 4: Guardar el archivo
      this.saveAsExcelFile(excelBuffer, surveyTitle);
    });
  }

  private groupDataBySurvey(): { surveyTitle: string; rows: { user: string; question: string; response: any }[] }[] {
    const grouped: { [key: string]: { surveyTitle: string; rows: { user: string; question: string; response: any }[] } } = {};

    this.repsosesTranform.forEach(user => {
      user.results.forEach((result: any) => {
        const surveyTitle = result.survey.title;

        // Crear una entrada para la encuesta si no existe
        if (!grouped[surveyTitle]) {
          grouped[surveyTitle] = {
            surveyTitle: surveyTitle,
            rows: [],
          };
        }

        // Añadir las preguntas y respuestas junto con el nombre del usuario
        grouped[surveyTitle].rows.push({
          user: user.user_name,
          question: result.question.question,
          response: result.response,
        });
      });
    });

    return Object.values(grouped);
  }


  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}.xlsx`);
  }

}
