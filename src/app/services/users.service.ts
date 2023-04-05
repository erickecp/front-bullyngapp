import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
const myUrl = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  getUpdateUsers: EventEmitter<any> = new EventEmitter();
  getUpdateUser: EventEmitter<any> = new EventEmitter();
  getremoveUser: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
  ) { }

  postUser(body: any ) {
    return this.http.post(`${myUrl}auth/register`, body);
  }

  getAllUsers(){
    return this.http.get(`${myUrl}auth/all`);
  }

  getSearch(term: string){
    return this.http.get(`${myUrl}auth/search?term=${term}`);
  }

  getUser(id: any){
    return this.http.get(`${myUrl}auth/${id}`);
  }

  updateUser(id: any, body: any){
    return this.http.put(`${myUrl}auth/${id}`, body);
  }

  remove(id: string){
    return this.http.patch(`${myUrl}auth/active/${id}`, {});
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
  removeUser(id: any) {
    this.getremoveUser.emit(id);
  }

  setupdateUser(body: any) {
    this.getUpdateUser.emit(body);
  }
}
