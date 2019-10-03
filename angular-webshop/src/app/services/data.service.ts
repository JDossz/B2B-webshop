import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UrlConcatenatorService } from './url-concatenator.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  restApiURL: string = 'http://localhost:3000/api';

  orderList: BehaviorSubject<any> = new BehaviorSubject([]);
  userList: BehaviorSubject<any> = new BehaviorSubject([]);
  projectList: BehaviorSubject<any> = new BehaviorSubject([]);
  basketList: BehaviorSubject<any> = new BehaviorSubject([]);
  categoryList: BehaviorSubject<any> = new BehaviorSubject([]);

  order: BehaviorSubject<any> = new BehaviorSubject([]);
  user: BehaviorSubject<any> = new BehaviorSubject([]);
  project: BehaviorSubject<any> = new BehaviorSubject([]);
  basket: BehaviorSubject<any> = new BehaviorSubject([]);
  category: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor (
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
  readTableByQuery(tableName: string, query: Object): void {
    this.http.get(`${this.restApiURL}/${tableName}/${this.url.getQueryString(query)}`).forEach(
      data => {
        if (tableName === 'orders' && query.hasOwnProperty('id')) {
          this.order.next(data[0]);
        }
        else if (tableName === 'orders') {
          this.orderList.next(data);
        }
        if (tableName === 'users' && query.hasOwnProperty('id')) {
          this.user.next(data[0]);
        }
        else if (tableName === 'users') {
          this.userList.next(data);
        }
        if (tableName === 'baskets' && query.hasOwnProperty('id')) {
          this.basket.next(data[0]);
        }
        else if (tableName === 'baskets') {
          this.basketList.next(data);
        }
        if (tableName === 'projects' && (query.hasOwnProperty('id') || query.hasOwnProperty('seo'))) {
          this.project.next(data);
        }
        else if (tableName === 'projects') {
          this.projectList.next(data);
        }
        if (tableName === 'categories' && query.hasOwnProperty('id')) {
          this.category.next(data[0]);
        }
        else if (tableName === 'categories') {
          this.categoryList.next(data)
        }
      });
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
  deleteRecordByQuery(tableName: string, query: Object): void {
    this.http.delete(`${this.restApiURL}/${tableName}/${this.url.getQueryString(query)}`).forEach(
      done => this.readTableByQuery(tableName, {})
    );

  }

}
