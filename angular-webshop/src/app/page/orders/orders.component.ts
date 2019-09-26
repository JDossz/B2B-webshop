import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  list$: Observable<any> = this.orderService.read();
  
  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    orderService.access()
  }

  ngOnInit() {
  }

  onDelete(id: number): void {
    this.orderService.delete(id).forEach(data => console.log(data))
  }

}
