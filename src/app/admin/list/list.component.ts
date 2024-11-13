import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AlertsService } from '../../services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {
  usuarios:any[] = [];
  copyusuarios:any[] = [];
  constructor(
    private route: Router,
    private usersS: UsersService,
    private alertsS: AlertsService,
    private authS: AuthService
  ) {
    // * Nos suscribimos al emiter para cachar los cambios
    this.usersS.getUpdateUsers.subscribe(
      (data) => {
        console.log(data);

        this.copyusuarios.push(data.school);
      }
    );
    this.usersS.getremoveUser.subscribe(
      (data) => {
        this.copyusuarios.splice(this.copyusuarios.indexOf(data), 1);
      }
    );
    this.usersS.getUpdateUser.subscribe(
      (data) => {
        const replace = this.copyusuarios.findIndex( f => f.id === data.id);
        if(replace !== -1){
          this.usuarios[replace] = data;
        }
      }
    )

  }



  ngOnInit() {
    this.usersS.getAllUsers().subscribe(
      (users: any) => {
        console.log(users);
        this.usuarios = users;
        this.copyusuarios = [...this.usuarios];
      }
    )
  }

  addUser(){
      this.route.navigateByUrl('/home/admin/add');
  }

  remove(id: string) {
    this.usersS.remove(id).subscribe(
      (data) => {
        console.log(data);
        this.alertsS.generateToast(
          {
            message: 'Usuario eliminado',
            duration: 1200,
            position: 'top',
            animated: true,
            icon: 'people',
            color: 'success',
          }
        );
        this.usersS.removeUser(id)
      }
    )
  }

  onSearchChange(event: any){
    this.copyusuarios = this.usuarios.filter(user => user.school_name.toLowerCase().includes(event.detail.value.toLowerCase()));
    // this.usuarios = this.copyusuarios;
  //  this.usersS.getSearch(event.detail.value).subscribe(
  //   (data: any) => {
  //     console.log(data);
  //     this.usuarios = data;
  //   }
  //  )

  }












}
