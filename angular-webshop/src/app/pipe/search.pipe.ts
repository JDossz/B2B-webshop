import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], searchedPhrase:string=''): any {
    return array.filter(item => {
      let jsonString = JSON.stringify(item)
        .replace(/"[^"]*"\:/g, '')
        .replace(/[",\{\}]/g, '');
      return jsonString.toLowerCase().indexOf(searchedPhrase.toLowerCase()) > -1;
    });
  }

}
