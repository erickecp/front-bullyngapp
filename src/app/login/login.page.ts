import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../validators/email.validator';
import { passwordValidator } from '../validators/password.validator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  background = {
    backgroundImage: 'url(https://img.freepik.com/foto-gratis/companeros-amigos-bolsa-escuela-educacion_53876-137717.jpg?w=996&t=st=1678490957~exp=1678491557~hmac=117fed44ae9e02b33f4c6980b3efe01dda33f565b77056b99d1549d54688a20f)'
  };
  constructor(
    private formBuilder: FormBuilder,
    private authS: AuthService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator]],
      password: [null, [Validators.required]],
    });
  }


  signIn() {
    if (this.loginForm.valid) {
      this.authS.login(this.loginForm.value).subscribe(
        resp => {
          console.log(resp)
        }
      );

    } else {
      // do something
    }
  }
}
