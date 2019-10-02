import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  // orders: any
  // orders$: BehaviorSubject<any> = this.dataService.orderList;
  // basket$: BehaviorSubject<any> = this.dataService.basketList;
  // // categories$: BehaviorSubject<any> = ;
  // projects$: BehaviorSubject<any> = this.dataService.projectList;
  // users$: BehaviorSubject<any> = this.dataService.userList;

  constructor (private dataService: DataService) {
    // this.dataService.readTableByQuery('orders', {});
    // this.dataService.readTableByQuery('baskets', {});
    // // this.dataService.readTableByQuery('baskets', {});
    // this.dataService.readTableByQuery('projects', {});
    // this.dataService.readTableByQuery('users', {});
  }

  ngOnInit() {
  }

}
