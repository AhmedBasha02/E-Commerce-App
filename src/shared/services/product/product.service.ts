import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);
  constructor() {}

  getProducts(): Observable<any> {
    return this.httpClient.get(environments.baseUrl + `products`);
  }

  getProductDetails(id: string | null): Observable<any> {
    return this.httpClient.get(environments.baseUrl + `products/${id}`);
  }
}
