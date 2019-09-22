import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private http: HttpClient
  ) { }

  deleteRecord() {
    return this.http.delete('http://localhost:3000/api/users/99');
  }

}
