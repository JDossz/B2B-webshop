import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-statistics-basic',
  templateUrl: './statistics-basic.component.html',
  styleUrls: ['./statistics-basic.component.css']
})
export class StatisticsBasicComponent implements OnInit {

  constructor(private dataService: DataService) { }

  /*Variables*/
  orderList$: BehaviorSubject<any> = this.dataService.orderList;
  countOrderList$: BehaviorSubject<any> = this.dataService.orderList;


  userList$: BehaviorSubject<any> = this.dataService.userList;


  projectList$:BehaviorSubject<any> = this.dataService.projectList;

  ngOnInit() {
    /*Orders*/

    /*Users*/

    /*Projects*/
    //Count
    this.dataService.readTableByQuery('orders', { select: 'COUNT(id) AS ordercount' })

    this.dataService.readTableByQuery('orders', {});
    this.dataService.readTableByQuery('users', {});
    this.dataService.readTableByQuery('projects', {});
  }
}
