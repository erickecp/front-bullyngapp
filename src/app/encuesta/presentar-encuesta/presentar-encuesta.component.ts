import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { encuesta, Qust } from '../../interfaces/login.interface';

import Swiper, { SwiperOptions, Pagination} from 'swiper';
import { preguntas } from 'src/app/interfaces/preguntas.interface';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { url } from 'inspector';

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
  preguntas : Qust[] = [];
  position = 0;
  v = [];
  private swipere!: Swiper;

  ngOnInit() {
    Swiper.use([Pagination]);
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
  constructor(
    private actRoute: ActivatedRoute,
    private route: Router,
    private encuestaS: EncuestasService,
    private fb: FormBuilder,
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.getEncuesta(this.id);

    })

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
      console.log('Encuesta completa perro');
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

  }


}
