import { AlertsService } from './../../services/alerts.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent  implements OnInit {
  formUser!: FormGroup;
  userSchool: any = {};
  userId = null;
  constructor(
    private fb: FormBuilder,
    private userS: UsersService,
    private _authS: AuthService,
    private activeRoute: ActivatedRoute,
    private alertS: AlertsService,
    private route: Router
  ) {

    this.userSchool = this._authS.getUser();
    console.log(this.userSchool);
    this.activeRoute.params.subscribe(
      (params) => {
        this.userId = params['id'];
        console.log(this.userId);
        if(this.userId){
          this.userS.getUser(this.userId).subscribe(
            (user) => {
              console.log(user);
              this.formUser.get('password')?.disable();
              this.formUser.reset(user);
            });
        }

      }
    )
  }

  ngOnInit() {
    this.generateForm();
  }


  generateForm(){
    this.formUser = this.fb.group({
      school_name: ['', Validators.required],
      key_school: ['', Validators.required],
      kind_school: ['', Validators.required],
      password: [, Validators.required],
      admin_id: [this.userSchool.id, Validators.required],
    });

  }

  onSubmit(){
    // this.formUser.get('roles') as FormArray;
    console.log(this.formUser.value)
    if(this.formUser.invalid){
      return;
    }
    if(this.userId){
      this.userS.updateUser(this.userId,this.formUser.value).subscribe(
        (user) => {
          this.userS.setupdateUser(user);
             this.alertS.generateToast({
            message: 'Usuario actualizado con Exito',
            duration: 1200,
            position: 'top',
            animated: true,
            icon: 'people',
            color: 'success',
          });
          this.route.navigate(['/home/admin']);
        });
    } else {
      this.userS.postUser(this.formUser.value).subscribe(
        (resp :  any ) => {
          console.log(resp);
          this.userS.setUser(resp);
          this.alertS.generateToast({
            message: 'Usuario creado con Exito',
            duration: 1200,
            position: 'top',
            animated: true,
            icon: 'people',
            color: 'success',
          });
          this.formUser.reset();
          this.route.navigate(['/home/admin']);
        });
      // this.userS.postUser(this.formUser.value).subscribe(
      //   (resp :  any ) => {
      //     this.userS.setUser(resp);
      //     this.alertS.generateToast({
      //       message: 'Usuario creado con Exito',
      //       duration: 1200,
      //       position: 'top',
      //       animated: true,
      //       icon: 'people',
      //       color: 'success',
      //     });
      //     this.formUser.reset();
      //     this.route.navigate(['/home/admin']);
      //   }, error => {
      //     this.alertS.generateToast({
      //       message: `ERROR: ${error.message}`,
      //       duration: 1200,
      //       position: 'top',
      //       animated: true,
      //       icon: 'alert-circle',
      //       color: 'danger',
      //     })
      //   }
      //);
    }


  }

}
