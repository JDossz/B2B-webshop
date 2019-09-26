import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics-basic',
  templateUrl: './statistics-basic.component.html',
  styleUrls: ['./statistics-basic.component.css']
})
export class StatisticsBasicComponent implements OnInit {

  constructor(private dataService: DataService) { }
  orderList: any
  orderList$: Observable<any> = this.dataService.readTableByQuery('orders', {});

  ngOnInit() {
    this.dataService.readTableByQuery('orders', {}).subscribe(orders => {
      this.orderList = orders;
      console.log(this.orderList);
      err => console.error(err)
    })
  }

}
