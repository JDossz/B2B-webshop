import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  list$: BehaviorSubject<any> = this.ds.orderList

  constructor(private ds: DataService) {
  }

  onDelete(id: number): void {
    this.ds.deleteRecordByQuery('orders', { 'id': id })
  }

  ngOnInit() {
    this.ds.readTableByQuery('orders', {
      select: 'users.id as userid, users.firstname, users.lastname, users.address, orders.insdate, orders.quantity, orders.id as orderid, orders.status',
      from: 'INNER JOIN users ON orders.userid = users.id'
    });
    this.list$.subscribe(data => console.log(data));
  }

}
