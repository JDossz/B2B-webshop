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

  /*Variables*/
  orderList: any
  orderList$: Observable<any> = this.dataService.readTableByQuery('orders', {});
  countOrderList: any
  balanceOfOrders: any


  userList: any
  userList$: Observable<any> = this.dataService.readTableByQuery('users', {});


  projectList: any
  projectList$: Observable<any> = this.dataService.readTableByQuery('projects', {});

  ngOnInit() {
    /*Orders*/
    this.dataService.readTableByQuery('orders', {}).subscribe(orders => {
      this.orderList = orders;
      err => console.error(err)
    })

    /*Users*/
    this.dataService.readTableByQuery('orders', {}).subscribe(users => {
      this.userList = users;
      err => console.error(err)
    })

    /*Projects*/
    this.dataService.readTableByQuery('projects', {}).subscribe(projects => {
      this.orderList = projects;
      err => console.error(err)
    })

    //Count
    this.dataService.readTableByQuery('orders', { select: 'COUNT(id) AS ordercount' }).subscribe(orders => {
      this.countOrderList = orders[0].ordercount;
      console.log('Count orders: ', this.countOrderList);
      err => console.error(err)
    })

    //Balance of ORders
    //  this.dataService.readTableByQuery('orders', { select: 'COUNT(id) AS ordercount' }).subscribe(orders => {
    //   this.balanceOfOrders = orders[0].ordercount;
    //   console.log('Count orders: ', this.balanceOfOrders);
    //   err => console.error(err)
    // })

  }
}
