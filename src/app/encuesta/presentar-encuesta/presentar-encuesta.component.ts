import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { encuesta } from '../../interfaces/login.interface';

import Swiper, { SwiperOptions, Pagination} from 'swiper';
import { preguntas } from 'src/app/interfaces/preguntas.interface';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

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
  encuesta: encuesta = {
  };
  preguntas : preguntas[] = [];
  private swipere!: Swiper;

  questionsLengh!: number ;

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
  countQuestions = 0;
  titleNextOrSave = 'Siguiente';
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
      this.preguntas = encuesta.preguntas;
      this.questionsLengh = this.preguntas.length;
      console.log('Son las encustas',encuesta);
      console.log('Son las preguntas',this.preguntas);
      console.log('La cantidad de preguntas',this.questionsLengh);
    })
  }

  async nextSave(){

    if(this.respuestas[this.countQuestions]){
      this.respuestas[this.countQuestions] = this.formAnswer.value.answer;
    }else{
      this.respuestas.push(this.formAnswer.value.answer);
    }

    if( this.countQuestions < this.questionsLengh ){
      this.titleNextOrSave = 'Siguiente';
      this.swipere.slideNext();
      this.countQuestions++;
    }
      this.titleNextOrSave = 'Guardar Respuestas';
      this.swipere.slideNext();
      this.formAnswer.reset();
      console.log(this.countQuestions);
    console.log('Esto se va guardando',this.respuestas);

    if(this.countQuestions == this.questionsLengh){
      this.route.navigateByUrl('/home/encuesta');
    }

  }

  async return(){
    if( this.countQuestions > 0){
      this.titleNextOrSave = 'Siguiente';
      this.swipere.slidePrev();
      this.countQuestions--;
      console.log('numero negativo', this.countQuestions);
      this.formAnswer.reset();
    }

  }


}
