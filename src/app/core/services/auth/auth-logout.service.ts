import { inject, Injectable } from '@angular/core';
import { AuthLoginService } from './auth-login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthLogoutService {
private readonly authLoginService=inject(AuthLoginService)
private readonly router=inject(Router)
  constructor() { }

  logOut(){
     //1-remove localstorage
     localStorage.removeItem('userToken');
     //2-set userData be null
     this.authLoginService.userData.next(null);
     //3-navigate to login
     this.router.navigate(['/auth/login']);
  }
}
