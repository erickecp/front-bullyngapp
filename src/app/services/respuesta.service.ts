import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const myUrl = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  constructor(     private http: HttpClient,) { }

  sendRespuestas(body: any ) {
    return this.http.post(`${myUrl}usuarioEncuestar`, body);
  }
}
