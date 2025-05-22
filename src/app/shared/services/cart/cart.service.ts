import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthLoginService } from '../../../core/services/auth/auth-login.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly authLoginService = inject(AuthLoginService);
  // token: string = JSON.stringify(localStorage.getItem('userToken'));
  constructor() {}

  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post(
      environments.baseUrl + `cart`,
      { productId },
      {
        headers: {
          // token: JSON.parse(this.token),
          token: this.authLoginService.getToken()!,
        },
      }
    );
  }
  updateProductCartQuantity(productId: string, count: string): Observable<any> {
    return this.httpClient.put(
      environments.baseUrl + `cart/${productId}`,
      { count },
      {
        headers: {
          token: this.authLoginService.getToken()!,
        },
      }
    );
  }
  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(
      environments.baseUrl + `cart`,

      {
        headers: {
          token: this.authLoginService.getToken()!,
        },
      }
    );
  }
  removeSpecificCartItem(productId: string): Observable<any> {
    return this.httpClient.delete(
      environments.baseUrl + `cart/${productId}`,

      {
        headers: {
          token: this.authLoginService.getToken()!,
        },
      }
    );
  }
  clearUserCart(): Observable<any> {
    return this.httpClient.delete(
      environments.baseUrl + `cart`,

      {
        headers: {
          token: this.authLoginService.getToken()!,
        },
      }
    );
  }
}
