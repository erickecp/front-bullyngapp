import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { encuesta, Qust } from '../../interfaces/login.interface';
import { forkJoin } from 'rxjs';
import Swiper, { SwiperOptions, Pagination} from 'swiper';
import { preguntas } from 'src/app/interfaces/preguntas.interface';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { url } from 'inspector';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseService } from 'src/app/services/response.service';
import { AlertsService } from 'src/app/services/alerts.service';

 //* Inicializar el Swiper


@Component({
  selector: 'app-presentar-encuesta',
  templateUrl: './presentar-encuesta.component.html',
  styleUrls: ['./presentar-encuesta.component.scss'],
})
export class PresentarEncuestaComponent  implements OnInit {
  // public SwiperConfig: SwiperOptions = {
  //    pagination: true,
  //    allowSlidePrev:false,
  //    navigation: {
  //     nextEl: '.swiper-button-next',

  //   },
  //   slidesPerView: 3,
  // }
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  encuesta: any = {
  };
  user:any = {};
  verVideo: boolean = false;
  preguntas : Qust[] = [];
  position = 0;
  v = [];
  private swipere!: Swiper;

  ngOnInit() {
    Swiper.use([Pagination]);
  }

  recibirDatos(datos: boolean): void {
    console.log('Datos recibidos del hijo:', datos);
    this.verVideo = datos;
  }

  ionViewDidEnter() {
    this.swipere = new Swiper('.swiper-container');
  }

  formAnswer: FormGroup = this.fb.group({
    answer: ['', [Validators.required]],
  });
  respuestas: any = [];
  respuestasmultiples: any[] = [];
  id :any;
   private _router = inject(Router);
    private _activeR= inject(ActivatedRoute);

  constructor(
    private actRoute: ActivatedRoute,
    private route: Router,
    private _authS: AuthService,
    private encuestaS: EncuestasService,
    private fb: FormBuilder,
    private _alertS: AlertsService,
    private _respS: ResponseService
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.getEncuesta(this.id);

    })
    this.user = this._authS.getUser();
    console.log('El usuario es', this.user);

   }


  async getEncuesta(id: string) {
    this.encuestaS.getEncuesta(id).subscribe((encuesta: any) => {
      this.encuesta =  encuesta;
      this.preguntas = encuesta.questions.map((q: any, qindex: any) => ({
        id: q.id,
        question: q.question,
        question_2: q.question_2 || null,
        category: q.category,
        url: q.url || null,
        answers: q.answers.map((opt:any,index: any)=>({
          label: opt,
          value: false
        }))
      }))
      console.log('Son las encustas',encuesta);
      console.log('Son las preguntas',this.preguntas);
      // this.transform();
    })
  }



  transform(){

    this.encuesta.subsurveys.forEach((e:any, index: number) => {
      console.log(e, index);
      // if(index === 0){
      //   this.preguntas.push({
      //     answers: [],
      //     description: 'firstvideo',
      //     id: 'firstvideo',
      //     isActive: true,
      //     ruta: e.videos[0].ruta,
      //     question: e.videos[0].title,
      //   });
      //   this.preguntas.push({
      //     answers: [
      //       1,2,3,4,5
      //     ],
      //     description: 'lastvideo',
      //     id: 'last',
      //     isActive: true,
      //     type: 'roof',
      //     title_2: 'Tomate',
      //     question: 'PRUEBA DEFUNCION',
      //     title: 'Cebolla'
      //   })
      //   this.preguntas = this.preguntas.concat([...e.questions])
      // }
      // if(index === 1){
      //   this.preguntas.push({
      //     answers: [],
      //     description: 'secondvideo',
      //     id: 'second',
      //     isActive: true,
      //     ruta: e.videos[0].ruta,
      //     title: e.videos[0].title,
      //   })
      //   this.preguntas = this.preguntas.concat([...e.questions])
      // }

    });
    console.log(' PREGUNTAS', this.preguntas);

  }

  onClick(answer: any){
    if(answer.value === true){
      this.respuestasmultiples.push(answer)
    } else {
      const index = this.respuestasmultiples.find(
        (option: any) => option.label === answer.label
      );
      if (index) {
        this.respuestasmultiples = this.respuestasmultiples.filter(x => x.label !== index.label)
      }
    }

  }

  submitSelections(quesionss: any) {
    console.log(quesionss);
    this.respuestasmultiples = quesionss.answers
      .filter((option: any) => option.value)
      .map((option: any) => option.label); // Aquí puedes obtener solo los labels seleccionados o el objeto completo
    console.log('Opciones seleccionadas:', this.respuestasmultiples);
    this.respuestas.push(this.respuestasmultiples);
    console.log(this.respuestas);
  }

  async nextSave(q: any, type?: string){
    console.log(q);
    this.position +=1;
    if(this.position >= this.preguntas.length){

      this.sendSurvey()
      return;
    }
    switch (type) {
      case 'multiple':
        const selectedOptions = q.answers
        .filter((option: any) => option.value)
        .map((option: any) => option.label);
        const newR = { idQ: q.id , question: q.question, answers: selectedOptions}
        console.log('Opciones seleccionadas:', newR);
        this.respuestas.push(newR);
        console.log('Esto se va guardando',this.respuestas);
        break;
      case 'opcion':
        console.log(this.formAnswer.value.answer);
        const newR1 = { idQ: q.id , question: q.question, answers: this.formAnswer.value.answer.label}
        this.respuestas.push(newR1);
        console.log('Esto se va guardando',this.respuestas);
        console.log(this.position);
        break;
      case 'escala':
        console.log(this.formAnswer.value.answer);
        const newR2 = { idQ: q.id , question: q.question, answers: this.formAnswer.value.answer}
        this.respuestas.push(newR2);
        console.log('Esto se va guardando',this.respuestas);
        console.log(this.position);
        break;
      case 'video':
        console.log(this.formAnswer.value.answer);
        const newR3 = { idQ: q.id , question: q.url, answers: true}
        this.respuestas.push(newR3);
        console.log('Esto se va guardando',this.respuestas);
        console.log(this.position);
        break;

      default:
        break;
    }
    this.respuestasmultiples = [];
    this.swipere.slideNext();
    this.formAnswer.reset();

  }

  sendSurvey(){

    const responses = this.respuestas.map((resp:any) => ({
      school_users_id: this.user.id,
      question_id: resp.idQ,
      response: resp.answers,
      survey_id: this.encuesta.id
    }));

    const requests = responses.map((response:any) =>
      this._respS.newResponse(response)
    );

    const surveyUser = {school_user_id :this.user.id, survey_id: this.encuesta.id}
    this._respS.newUserSurvey(surveyUser).subscribe({
      next: () => {
        forkJoin(requests).subscribe({
          next: () => {
            this._alertS.generateToast({
              message: 'Encuesta enviada correctamente',
              color:'success',
              duration: 1200,
            });
          },
          error: (error) => {
            console.log('Error al enviar encuesta', error);
            this._alertS.generateToast({
              message: 'Error al enviar encuesta',
              color: 'danger',
              duration: 1200,
            });
          }
        }
    );
      },
      error: (error) => {
        console.log('Error al enviar encuesta', error);
        this._alertS.generateToast({
          message: 'Error al enviar encuesta',
          color: 'danger',
          duration: 1200,
        });
      }
    })

    console.log('eniviandop info', this.respuestas);
    this._router.navigate([`home/encuesta/encuestafinal/${this.id}/1`]);



  }


}
