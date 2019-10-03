import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderDetails$: BehaviorSubject<any> = this.ds.orderDetailsList;

  constructor(
    private ds: DataService,
    private ar: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    let orderID;
    this.ar.params.forEach(param => orderID = param.id);
    console.log(orderID);
    this.ds.readTableByQuery('orderdetails', {
      orderid: Number.parseInt(orderID, 10),
    });
  }

  log() {
    console.log(this.orderDetails$);
  }

}
