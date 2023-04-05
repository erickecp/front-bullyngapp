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
    return this.http.post(`${myUrl}auth/login`, body).pipe(
      map((resp: any ) => {
        this.guardaToken(resp.token);
        this.guardaUsuario({
          id: resp.id,
          instituto: resp.instituto,
          poblacion: resp.pobleacion,
          sexo: resp.sexo,
          fullName: resp.fullName,
          roles: resp.roles
        });
        if ( resp.roles[0] === 'admin') {
          this.navCtrl.navigateRoot('/home/admin');
        } else {
          this.navCtrl.navigateRoot('/login');
        }

        return resp;
      })
    )

  }


  guardaUsuario(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  guardaToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }
}
