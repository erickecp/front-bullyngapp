import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export const authGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const _route = inject(Router);
  if(_auth.geToken()){
    console.log(_auth.geToken());

    return true;
  }
  _route.navigate(['/login']);
  return false;
};
