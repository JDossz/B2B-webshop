import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order';


@Component({
  selector: 'app-create-orders',
  templateUrl: './create-orders.component.html',
  styleUrls: ['./create-orders.component.css']
})
export class CreateOrdersComponent implements OnInit {

  order: Order = new Order;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    this.orderService.create(this.order).subscribe(
      order => {

        this.router.navigateByUrl("/")

      }, err => console.error(err)

    )

  }

}
