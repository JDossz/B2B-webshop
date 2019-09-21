import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbTestService {

  constructor(
    private http: HttpClient
  ) { }

  url: string = "http://localhost:3000/api/users";

  testDelete(id) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
