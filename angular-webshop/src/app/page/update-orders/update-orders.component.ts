import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-orders',
  templateUrl: './update-orders.component.html',
  styleUrls: ['./update-orders.component.css']
})
export class UpdateOrdersComponent implements OnInit {

  order: Order;

  constructor(
    private ds: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const orderID = (this.activatedRoute.snapshot.params['id'])
    this.ds.readTableByQuery('orders', { id: Number.parseInt(orderID, 10) })
;

  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    console.log(this.order)
    this.ds.updateRecordByQuery('orders', { id: this.order.id }, this.order).subscribe(
      order => {
        this.router.navigateByUrl("/orders");
        this.order = order;
      }, err => console.error(err)

    )

  }

}