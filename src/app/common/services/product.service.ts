import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductType } from '../types/product.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'https://testologia.ru/tea';

  constructor(private http: HttpClient) { }

  getProducts(search?: string): Observable<ProductType[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<ProductType[]>(this.apiUrl, { params });
  }

  getProduct(id: number): Observable<ProductType | null> {
    return this.http.get<ProductType | null>(this.apiUrl, {
      params: new HttpParams().set('id', id)
    });
  }
}
