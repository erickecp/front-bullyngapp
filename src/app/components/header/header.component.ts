import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() header: any ='';
  name = '';
  type :'student' | 'school' | 'admin' = 'student';
  constructor(
    private _authS: AuthService,
    private _router: Router
  ) {
    const u = this._authS.getUser();
    console.log(u);
    if (u) {
      if(u.school_id){
        this.type ='student';
      }else if(u.key_school){
        this.type ='school';
      }
      else {
        this.type ='admin';
      }
      this.name = u.user_name || u.school_name || u.admin_name;
      console.log(this.name);

    }

   }

  ngOnInit() {}
  logout(){
    this._authS.logout();
  }

  toResponses(){
    this._router.navigateByUrl('/home/admin/responses');
  }
}
