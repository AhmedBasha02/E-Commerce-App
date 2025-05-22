import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopularCategoriesService {
  private readonly httpClient = inject(HttpClient);
  // private readonly API_BASE_URL = inject(API_BASE_URL);
  constructor() {}

  getAllCategories(): Observable<any> {
    return this.httpClient.get(environments.baseUrl + `categories`);
    // return this.httpClient.get(this.API_BASE_URL + `categories`);
  }
}
