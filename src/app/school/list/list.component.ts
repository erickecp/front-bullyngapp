import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {
  usuarios: any[] = [];
  copyusuarios:  any[] = [];
  constructor(
    private _router: Router,
    private _userS: UsersService,
    private _authS: AuthService,
  ) { }

  ngOnInit() {
    this._userS.getStudent.subscribe((student) => {
      this.getStudents();
    });
    this.getStudents();
  }
  logout(){
    this._authS.logout();
    this._router.navigate(['/']);
  }
  addUser(){
    this._router.navigate(['home/school/add']);
  }
  onSearchChange(e: any){}
  remove(id: string){
    this._userS.removeStudent(id).subscribe(
      (data) => {
        console.log(data);
        this.getStudents();
      }
    )
  }

  getStudents(){
    this._userS.getAllStudents().subscribe(
      (students: any) => {
        console.log(students);

        this.usuarios = students;
        this.copyusuarios = [...this.usuarios];
      }
    )
  }

}
