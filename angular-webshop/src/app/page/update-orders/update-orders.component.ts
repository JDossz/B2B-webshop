import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from '../../service/order.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-orders',
  templateUrl: './update-orders.component.html',
  styleUrls: ['./update-orders.component.css']
})
export class UpdateOrdersComponent implements OnInit {
  order: Order

  constructor(
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = (this.activatedRoute.snapshot.params['id'])
    this.orderService.getOne(id).subscribe(order => { this.order = order[0] });
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    this.orderService.update(this.order).subscribe(
      order => {
        this.router.navigateByUrl("/orders")

      }, err => console.error(err)

    )

  }

}
