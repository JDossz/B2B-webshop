import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics-basic',
  templateUrl: './statistics-basic.component.html',
  styleUrls: ['./statistics-basic.component.css']
})
export class StatisticsBasicComponent implements OnInit {

  constructor(private dataService: DataService) { }

  /*Variables*/
  orderList: any
  orderList$: Observable<any> = this.dataService.readTableByQuery('orders', {});
  userList: any
  userList$: Observable<any> = this.dataService.readTableByQuery('users', {});
  projectList: any
  projectList$: Observable<any> = this.dataService.readTableByQuery('projects', {});

  ngOnInit() {
    /*Orders*/
    this.dataService.readTableByQuery('orders', {}).subscribe(orders => {
      this.orderList = orders;
      console.log(this.orderList);
      err => console.error(err)
    })

    /*Users*/
    this.dataService.readTableByQuery('orders', {}).subscribe(users => {
      this.userList = users;
      console.log(this.userList);
      err => console.error(err)
    })

    /*Projects*/
    this.dataService.readTableByQuery('projects', {}).subscribe(projects => {
      this.orderList = projects;
      console.log(this.orderList);
      err => console.error(err)
    })
  }

}
