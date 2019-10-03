import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UrlConcatenatorService } from './url-concatenator.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  restApiURL: string = 'http://localhost:3000/api';
  constructor (
    private http: HttpClient,
    private url: UrlConcatenatorService,
  ) { }

  /**
   * Gets given records meeting the conditions from the query.
   * @param tableName Name of the database table.
   * @param query Contains the parts of the url query as properites
   * @returns Response observable containing the read data.
   */
  readTableByQuery(tableName: string, query: Object): Observable<any> {
    return this.http.get<any>(`${this.restApiURL}/${tableName}/${this.url.getQueryString(query)}`)
  }
}
