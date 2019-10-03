import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-update-orders',
  templateUrl: './update-orders.component.html',
  styleUrls: ['./update-orders.component.css']
})
export class UpdateOrdersComponent implements OnInit {

  order$: BehaviorSubject<Order> = this.ds.orderList;
  order: any;

  constructor(
    private ds: DataService,
    private router: Router,
    private ar: ActivatedRoute,
  ) {
    this.ar.params.forEach(params => {
      this.ds.readTableByQuery('orders', {
        select: 'orders.id as id, orders.insdate as insdate, orders.userid as userid, orders.quantity as quantity, orders.status as status, users.lastname as lastname, users.firstname as firstname',
        'orders.id': params.id,
        from: 'INNER JOIN users ON orders.userid = users.id',
      });
    });
    this.order$.subscribe(
      data => {
        this.order = data[0];
      }
    );
  }

  ngOnInit() { }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    delete this.order.firstname;
    delete this.order.lastname;
    this.ds.updateRecordByQuery('orders', { id: this.order.id }, this.order).subscribe(
      order => {
        this.router.navigateByUrl("/orders");
        this.order = order;
      }, err => console.error(err)

    )

  }

}
