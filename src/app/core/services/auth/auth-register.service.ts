import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../../environments/environment';
import { AuthRegisterUser } from '../../interfaces/auth-register-user';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root',
})
export class AuthRegisterService {
  private readonly httpClient = inject(HttpClient);
  // private readonly API_BASE_URL = inject(API_BASE_URL);
  constructor() {}

  registerUser(userInfo: AuthRegisterUser): Observable<any> {
    return this.httpClient.post(environments.baseUrl + `auth/signup`, userInfo);
    //  return this.httpClient.post(this.API_BASE_URL + `auth/signup`, userInfo);
  }
}
