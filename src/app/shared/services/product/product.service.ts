import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../../environments/environment';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);
  //private readonly API_BASE_URL = inject(API_BASE_URL);
  constructor() {}

  getProducts(categoryId?: string): Observable<any> {
    let url = categoryId
      ? environments.baseUrl + `products?category[in]=${categoryId}`
      : environments.baseUrl + `products`;
    return this.httpClient.get(url);
  }

  getProductDetails(id: string | null): Observable<any> {
    return this.httpClient.get(environments.baseUrl + `products/${id}`);
    //return this.httpClient.get(this.API_BASE_URL + `products/${id}`);
  }
}
