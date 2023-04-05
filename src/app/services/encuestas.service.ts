import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
const myUrl = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(
    private http: HttpClient,
  ) { }


  getEncuestas(){
    return this.http.get(`${myUrl}encuesta`);
  }
  getEncuesta(id: string){
    return this.http.get(`${myUrl}encuesta/${id}`);
  }
}
