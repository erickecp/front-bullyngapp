import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { login } from '../interfaces/login.interface';
import { map } from 'rxjs';
import { LoginResponse } from '../interfaces/respLogin.interface';
import { NavController } from '@ionic/angular';

const myUrl = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  user: any = {};

  constructor(
    private http: HttpClient,
    private navCtrl: NavController) { }

  login(body: login){
    return this.http.post(`${myUrl}loginA`, body).pipe(
      map((resp: any ) => {
        this.guardaToken(resp.token);
        this.guardaUsuario(resp.admin);
        if ( resp.admin) {
          this.navCtrl.navigateRoot('/home/admin');
        } else {
          this.navCtrl.navigateRoot('/login');
        }

        return resp;
      })
    )
  }
  loginSchool(body: any){
    return this.http.post(`${myUrl}loginS`, body).pipe(
      map((resp: any ) => {
        console.log(resp);

        this.guardaToken(resp.token);
        this.guardaUsuario(resp.school);
        if ( resp.school) {
          this.navCtrl.navigateRoot('/home/school');
        } else {
          this.navCtrl.navigateRoot('/login');
        }

        return resp;
      })
    )
  }
  loginUser(body: any){
    return this.http.post(`${myUrl}loginU`, body).pipe(
      map((resp: any ) => {
        console.log(resp);

        this.guardaToken(resp.token);
        this.guardaUsuario(resp.user);
        if ( resp.user) {
          this.navCtrl.navigateRoot('/home/encuesta');
        } else {
          this.navCtrl.navigateRoot('/login');
        }

        return resp;
      })
    )
  }

  getUser(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }


  logout(){
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');
  }

  guardaUsuario(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user) || '{}');
  }

  guardaToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }
}
