import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "datefilter"
})
export class DatefilterPipe implements PipeTransform {
  transform(baseArray: any[], active: boolean, key: string = "orderid"): any {
    let result = baseArray.sort((a, b) => {
      return (
        (a[key].toString() as string).localeCompare(b[key].toString()) * -1
      );
    });
    if (active) {
      return result.filter(el => el.status !== 5 && el.status !== 4);
    }
    return result;
  }
}
