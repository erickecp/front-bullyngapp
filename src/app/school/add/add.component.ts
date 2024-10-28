import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent  implements OnInit {
  userId =  null;
  user: any;
  formUser!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _authS: AuthService,
    private _usersS: UsersService,
    private _alertS: AlertsService

  ) { }

  ngOnInit() {
    this.user = this._authS.getUser();
    this.generateForm()
  }

  generateForm(){
    this.formUser = this.fb.group({
      user_name: ['', Validators.required],
      //key_school: ['', Validators.required],
    //  kind_school: ['', Validators.required],
      password: [, Validators.required],
      school_id: [this.user.id, Validators.required],
    });

  }

  onSubmit(){
    if(this.formUser.invalid){
      return;
    }

      this._usersS.newStudent(this.formUser.value).subscribe(
        {
          next: (user) => {
            this._usersS.setStudent(user);
            console.log(user);
            this._alertS.generateToast({
              message: 'Usuario agregado con exito',
              color:'success',
              duration: 1200,
            });
          },
          error: (err) => {
            console.error(err);
            this._alertS.generateToast({
              message: `Error: ${err.error}`,
              duration: 1200,
              color: 'danger',
            });
          }
        }
      );
      this.formUser.reset();
  }

}
