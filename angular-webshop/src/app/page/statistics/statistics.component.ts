import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  users: any
  users$: Observable<any> = this.statisticsService.readTableByQuery('users', {});
  orders: any
  orders$: Observable<any> = this.statisticsService.readTableByQuery('orders', {});
  projects: any
  projects$: Observable<any> = this.statisticsService.readTableByQuery('projects', {});
  countedUsers: number = 0;
  countedAdmins: number = 0;
  countedCivils: number = 0;
  countedOrders: number = 0;
  totalBalanceOfOrders: number = 0;

  constructor (private statisticsService: StatisticsService) {
    this.statisticsService.readTableByQuery('users', {});
    this.statisticsService.readTableByQuery('orders', {});
    this.statisticsService.readTableByQuery('projects', {});

    this.users$.subscribe(data => {
      this.users = data;
      // console.log('Users: ', this.users);
      this.countUsers();
    });

    this.orders$.subscribe(data => {
      this.orders = data;
      // console.log('Users: ', this.users);
      this.countOrders();
    });

    this.projects$.subscribe(data => {
      this.projects = data;
      // console.log('Users: ', this.users);
      this.countBalance();
    });
  }

  countUsers() {
    //All
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
    // console.log(this.countedUsers);
    // console.log(this.countedAdmins);
    // console.log(this.countedCivils);
  }

  countOrders() {
    for (let i = 0; i < this.orders.length; i++) {
      this.countedOrders++
    }
  }

  countBalance() {
    for (let i = 0; i < this.projects.length; i++) {
      this.totalBalanceOfOrders += this.projects[i].balance
    }
  }

  ngOnInit() {
  }

}
