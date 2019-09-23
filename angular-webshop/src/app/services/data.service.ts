import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlConcatenatorService } from './url-concatenator.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  restApiURL: string = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private url: UrlConcatenatorService,
  ) { }

  /**
   * Creates a record from the given data.
   * @param tableName Name of the database table.
   * @param data Represents the data to be created.
   * @returns Response observable.
   */
  createRecord(tableName: string, data: Object): Observable<any> {
    return this.http.post(`${this.restApiURL}/${tableName}`, data);
  }

  /**
   * Gets given records meeting the conditions from the query.
   * @param tableName Name of the database table.
   * @param query Contains the parts of the url query as properites
   * @returns Response observable containing the read data.
   */
  readTableByQuery(tableName: string, query: Object): Observable<any> {
    return this.http.get(`${this.restApiURL}/${tableName}/${this.url.getQueryString(query)}`);
  }

  /**
   * Gets a specific record based on URL seo name.
   * @param tableName Name of the database table.
   * @param seoName 
   * @returns Response observable containing the read record.
   */
  readTableBySeoName(tableName: string, seoName: string): Observable<any> {
    return this.http.get(`${this.restApiURL}/${tableName}/%27${seoName}%27`);
  }

  /**
   * Updates given records meeting the conditions from the query.
   * @param tableName Name of the database table.
   * @param query Contains the parts of the url query as properites
   * @param data Represents the data to be created.
   * @returns Response observable
   */
  updateRecordByQuery(tableName: string, query: Object, data: Object): Observable<any> {
    return this.http.put(`${this.restApiURL}/${tableName}/${this.url.getQueryString(query)}`, data);
  }

  /**
   * Deletes given records meeting the conditions from the query.
   * @param tableName Name of the database table.
   * @param query Contains the parts of the url query as properites
   * @returns Response observable
   */
  deleteRecordByQuery(tableName: string, query: Object): Observable<any> {
    return this.http.delete(`${this.restApiURL}/${tableName}/${this.url.getQueryString(query)}`);
  }

}
