import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  //Users
  users$: Observable<any> = this.statisticsService.readTableByQuery('users', {});
  users: any
  countedAdmins: number = 0;
  countedCivils: number = 0;
  countedUsers: number = 0;

  //Projects
  projects$: Observable<any> = this.statisticsService.readTableByQuery('projects', {});
  projects: any
  countDeletedProjects: number = 0;

  //Orders
  orders$: Observable<any> = this.statisticsService.readTableByQuery('orders', {});
  orders: any
  totalBalanceOfOrders: number = 0;
  countedOrders: number = 0;
  orderStatus1: number = 0;
  orderStatus2: number = 0;
  orderStatus3: number = 0;
  orderStatus4: number = 0;
  orderStatus5: number = 0;

  constructor(private statisticsService: StatisticsService) {
    this.users$.subscribe(data => {
      this.users = data;
      // console.log('Users: ', this.users);
      this.countUsers();
    });

    this.orders$.subscribe(data => {
      this.orders = data;
      // console.log('Users: ', this.users);
      this.manageOrders();
    });

    this.projects$.subscribe(data => {
      this.projects = data;
      // console.log('Users: ', this.users);
      this.manageProjects();
    });
  }

  countUsers() {
    for (let i = 0; i < this.users.length; i++) {
      this.countedUsers++

      //Admins
      if (this.users[i].admin == 1) {
        this.countedAdmins++
      }
      if (this.users[i].admin == 0) {
        this.countedCivils++
      }
    }
  }


  manageOrders() {
    for (let i = 0; i < this.orders.length; i++) {
      this.countedOrders++
      if (this.orders[i].status == 1) {
        this.orderStatus1++
      }
      if (this.orders[i].status == 2) {
        this.orderStatus2++
      }
      if (this.orders[i].status == 3) {
        this.orderStatus3++
      }
      if (this.orders[i].status == 4) {
        this.orderStatus4++
      }
      if (this.orders[i].status == 5) {
        this.orderStatus5++
      }
    }
  }

  manageProjects() {
    for (let i = 0; i < this.projects.length; i++) {
      this.totalBalanceOfOrders += this.projects[i].balance
      if (this.projects[i].isactive == 0) {
        this.countDeletedProjects++
      }
    }
  }

  ngOnInit() {
  }

}
