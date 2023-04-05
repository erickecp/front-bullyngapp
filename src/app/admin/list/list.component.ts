import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {
  usuarios:any[] = [];
  constructor(
    private route: Router,
    private usersS: UsersService,
    private alertsS: AlertsService
  ) {
    // * Nos suscribimos al emiter para cachar los cambios
    this.usersS.getUpdateUsers.subscribe(
      (data) => {
        this.usuarios.push(data);
      }
    );
    this.usersS.getremoveUser.subscribe(
      (data) => {
        this.usuarios.splice(this.usuarios.indexOf(data), 1);
      }
    );
    this.usersS.getUpdateUser.subscribe(
      (data) => {
        const replace = this.usuarios.findIndex( f => f.id === data.id);
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
            message: 'Usuario modo inactivo',
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

   this.usersS.getSearch(event.detail.value).subscribe(
    (data: any) => {
      console.log(data);
      this.usuarios = data;
    }
   )

  }












}
