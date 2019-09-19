import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: string = 'http://localhost:3000/api/orders';

  constructor(
    private http: HttpClient
  ) { }

  access(): void {
    this.http.get(this.url).subscribe(data =>
      console.log(data))
  }
  read(): Observable<any> {
    return this.http.get(this.url);
  }

  getOne(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.url}/${id}`)
  }

  delete(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.url}/${id}`)
  }

  update(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.url}/${order.id}`, order)
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url, order)
  }

}
