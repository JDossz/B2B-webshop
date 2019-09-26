import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  list$: BehaviorSubject<any> = this.ds.list
  
  constructor(private ds: DataService) { 
   }

    onDelete(id: number): void {
      this.ds.deleteRecordByQuery('orders',{ 'id':id })
    }

  ngOnInit() {
    this.ds.readTableByQuery('orders', {});

  }

}
