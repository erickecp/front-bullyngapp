import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
const myUrl = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  getUpdateUsers: EventEmitter<any> = new EventEmitter();
  getStudent: EventEmitter<any> = new EventEmitter();
  getUpdateUser: EventEmitter<any> = new EventEmitter();
  getremoveUser: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
  ) { }

  postUser(body: any ) {
    return this.http.post(`${myUrl}newSchool`, body);
  }

  getAllUsers(){
    return this.http.get(`${myUrl}getSchools`);
  }
  getAllStudents(){
    return this.http.get(`${myUrl}getUsers`);
  }
  newStudent(body: any){
    return this.http.post(`${myUrl}newUser`, body);
  }
  removeStudent(id: string){
    return this.http.delete(`${myUrl}deleteUser/${id}`);
  }

  getSearch(term: string){
    return this.http.get(`${myUrl}auth/search?term=${term}`);
  }

  getUser(id: any){
    return this.http.get(`${myUrl}getSchool/${id}`);
  }

  updateUser(id: any, body: any){
    return this.http.put(`${myUrl}updateSchool/${id}`, body);
  }

  remove(id: string){
    return this.http.delete(`${myUrl}deleteSchool/${id}`);
  }
  updateUserStudent(id: any, body: any){
    return this.http.put(`${myUrl}updateUser/${id}`, body);
  }


  /*
  .########.##.....##.####.########.########.########.########...######.
  .##.......###...###..##.....##.......##....##.......##.....##.##....##
  .##.......####.####..##.....##.......##....##.......##.....##.##......
  .######...##.###.##..##.....##.......##....######...########...######.
  .##.......##.....##..##.....##.......##....##.......##...##.........##
  .##.......##.....##..##.....##.......##....##.......##....##..##....##
  .########.##.....##.####....##.......##....########.##.....##..######.
  */

  setUser(user: any) {
    this.getUpdateUsers.emit(user);
  }
  setStudent(user: any) {
    this.getStudent.emit(user);
  }
  removeUser(id: any) {
    this.getremoveUser.emit(id);
  }

  setupdateUser(body: any) {
    this.getUpdateUser.emit(body);
  }
}
