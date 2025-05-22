import { HttpClient } from '@angular/common/http';
import { afterNextRender, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environments } from '../../../../environments/environment';
import { AuthLoginUser } from '../../interfaces/auth-login-user';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from '../../../token/api-token';
import { AuthLogoutService } from './auth-logout.service';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginService {
  private readonly httpClient = inject(HttpClient);
  // private readonly authLogoutService = inject(AuthLogoutService);
  // private readonly API_BASE_URL = inject(API_BASE_URL);

  userData: BehaviorSubject<any> = new BehaviorSubject('');
  constructor() {
    /*dah 2t3aml 3l4an mo4kelt el local storage el hwa fe el ssr me4 bet4ta8l fa lma 23ml dah el hwa el after ba2olh 
     kdah ba3d ma te3ml el render bta3 el ssr el badoh hwa el browser fa 3ady hy4of el localstorage*/
    //el afterNextRender me4 bet4ta8l 8er gwa constructor bs t2rebn
    afterNextRender(() => {
      this.isLoggedInUSer();
    });
  }

  loginUser(userInfo: AuthLoginUser): Observable<any> {
    return this.httpClient.post(environments.baseUrl + `auth/signin`, userInfo);
    // return this.httpClient.post(this.API_BASE_URL + `auth/signin`, userInfo);
  }

  setToken(token: string): void {
    if (typeof localStorage != 'undefined') {
      return localStorage.setItem('userToken', token);
    }
  }
  getToken(): string | null {
    if (typeof localStorage != 'undefined') {
      return localStorage.getItem('userToken');
    }
    return null;
  }

  saveUserToken() {
    if (typeof localStorage != 'undefined') {
      if (this.getToken() /*or localStorage.getItem('userToken')*/) {
        this.userData.next(
          jwtDecode(this.getToken()! /*or localStorage.getItem('userToken')! */)
        );
      }
    }
  }

  isLoggedInUSer(): boolean {
    if (typeof localStorage != 'undefined') {
      if (localStorage.getItem('userToken')) {
        this.userData.next(
          jwtDecode(this.getToken()! /*or localStorage.getItem('userToken')!*/)
        );
        return true;
      } else {
        return false;
      }
    }
    return false;

    //or
    /* let token = this.getToken()!
        return !!token
    */
  }
}
