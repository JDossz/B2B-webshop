import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlConcatenatorService {

  queryString: string = '?';

  constructor() { }

  /**
   * Generates an URL query string based on the query object parameter.
   * @param query An object representing the query property-value pairs.
   */
  getQueryString(query: Object): string {
    this.generateQueryString(query);
    return this.queryString;
  }

  /**
   * Generates the url query string
   * @param query An object representing the query property-value pairs.
   */
  private generateQueryString(query: Object): void {
    this.emptyPreviousString();
    Object.keys(query).forEach(key => {
      this.queryString = this.queryString.concat(`${key}=${query[key]}`);
    });
  }

  /**
   * Empties previous string results.
   */
  private emptyPreviousString(): void {
    this.queryString = '?';
  }

}
