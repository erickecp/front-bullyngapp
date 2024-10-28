import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() header: any ='';
  name = '';
  constructor(
    private _authS: AuthService,
  ) {
    const u = this._authS.getUser();
    console.log(u);
    if (u) {
      this.name = u.user_name || u.school_name || u.admin_name;
    }

   }

  ngOnInit() {}

}
