import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderResponseType, OrderType } from '../types/order.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiUrl = 'https://testologia.ru/order-tea';

  constructor(private http: HttpClient) { }

  createOrder(order: OrderType): Observable<OrderResponseType> {
    return this.http.post<OrderResponseType>(this.apiUrl, order);
  }
}
