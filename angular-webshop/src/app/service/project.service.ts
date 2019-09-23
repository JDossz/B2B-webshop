import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
url:string='http://localhost:3000/api/projects'

  constructor(private http:HttpClient) {}
  read(): Observable<any> {
    return this.http.get(this.url)
  }

  readOne(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.url}/${id}`)
  }

  create(project: Project): Observable<Project> {
    return this.http.post<Project>(this.url, project)
  }

  update(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.url}/${project.id}`, project)
  }

  delete(id: number): Observable<Project> {
    return this.http.delete<Project>(`${this.url}/${id}`)
  }

}
