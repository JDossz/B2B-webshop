import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:3000/api/users';
  constructor(
    private http: HttpClient
  ) { }

  access(): void {
    this.http.get(this.url).subscribe(data =>
      data)
  }

  read(): Observable<any> {
    return this.http.get(this.url);
  }

  getOne(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`)
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`)
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user)
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.url, user)
  }
}
