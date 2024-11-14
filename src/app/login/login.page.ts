import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../validators/email.validator';
import { passwordValidator } from '../validators/password.validator';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  type: number = 1;
  background = {
    backgroundImage: 'url(https://img.freepik.com/foto-gratis/companeros-amigos-bolsa-escuela-educacion_53876-137717.jpg?w=996&t=st=1678490957~exp=1678491557~hmac=117fed44ae9e02b33f4c6980b3efe01dda33f565b77056b99d1549d54688a20f)'
  };
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authS: AuthService,
    private alertS: AlertsService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user_name: [null, [Validators.required,]],
      password: [null, [Validators.required]],
    });
  }

  changeType(type: number){
    this.type = type;
    console.log(this.type);

  }


  signIn() {
    if (this.loginForm.valid) {

    if(this.type === 1){
        this.authS.login(this.loginForm.value).subscribe(
          {
            next: (user) => {
              this.alertS.generateToast({
                message: 'Ingreso exitoso',
                color: 'success',
                duration: 1200,
              })

            },
            error: (err) => {
              console.error(err);
              this.alertS.generateToast({
                message: `Error al ingresar ${err.error.error}`,
                color: 'danger',
                duration: 1200,
              });
              this.loginForm.reset();
            }
          }


        );

    } else if(this.type === 2){

      const newObject = {
        school_name : this.loginForm.get('user_name')?.value,
        password : this.loginForm.get('password')?.value,
      }

      this.authS.loginSchool(newObject).subscribe(
        {
          next: (user) => {
            this.alertS.generateToast({
              message: 'Ingreso exitoso',
              color: 'success',
              duration: 1200,
            })

          },
          error: (err) => {
            console.error(err);
            this.alertS.generateToast({
              message: `Error al ingresar ${err.error.error}`,
              color: 'danger',
              duration: 1200,
            });
            this.loginForm.reset();
          }
        }
      );

    } else {
      const newObject = {
        user_name : this.loginForm.get('user_name')?.value,
        password : this.loginForm.get('password')?.value,
      }

      this.authS.loginUser(newObject).subscribe(
        {
          next: (user) => {
            this.alertS.generateToast({
              message: 'Ingreso exitoso',
              color: 'success',
              duration: 1200,
            })

          },
          error: (err) => {
            console.error(err);
            this.alertS.generateToast({
              message: `Error al ingresar ${err.error.error}`,
              color: 'danger',
              duration: 1200,
            });
            this.loginForm.reset();
          }
        }
      )

    }
    //this.navCtrl.navigateRoot('/home/encuesta');
    //return;

  }}
}
