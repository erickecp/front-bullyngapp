import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const myUrl = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(
    private _http: HttpClient
  ) { }

  newResponse(body: any){
    return this._http.post(`${myUrl}responses/`, body);
  }
  newUserSurvey(body: any){
    return this._http.post(`${myUrl}userSurveys/`, body);
  }

  getUserSurveys(id: string){
    return this._http.get(`${myUrl}userSurveys/${id}`);
  }

  getResponseByID(id: any){
    return this._http.get(`${myUrl}responses/getResponseByid/${id}`);
  }
}
