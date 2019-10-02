import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-create-orders',
  templateUrl: './create-orders.component.html',
  styleUrls: ['./create-orders.component.css']
})
export class CreateOrdersComponent implements OnInit {

  order: Order = new Order();

  constructor(
    private ds: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    this.ds.createRecord('orders', this.order).subscribe(
      () => {

        this.router.navigateByUrl("/orders")

      }, err => console.error(err)

    )

  }

}
