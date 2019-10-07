import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  //Users
  users$: Observable<any> = this.statisticsService.readTableByQuery('users', {});
  users: any
  countedAdmins: number = 0;
  countedCivils: number = 0;
  countedUsers: number = 0;
  deletedUsers: number = 0;

  //Projects
  projects$: Observable<any> = this.statisticsService.readTableByQuery('projects', {});
  projects: any
  countedProjects: number = 0;
  countedDeletedProjects: number = 0;
  countActiveProjects: number = 0;
  countPassiveProjects: number = 0;
  countedMaxDonation: number = 0;
  countedMinDonation: number = 0;
  countedAverageDonaton: number = 0;

  //Orders
  orders$: Observable<any> = this.statisticsService.readTableByQuery('orders', {});
  orders: any
  totalBalanceOfOrders: number = 0;
  countedOrders: number = 0;
  orderStatus1: number = 0;
  orderStatus2: number = 0;
  orderStatus3: number = 0;
  orderStatus4: number = 0;


  constructor (private statisticsService: StatisticsService) {
    this.statisticsService.readTableByQuery('users', {});
    this.statisticsService.readTableByQuery('orders', {});
    this.statisticsService.readTableByQuery('projects', {});

    this.users$.subscribe(data => {
      this.users = data;
      // console.log('Users: ', this.users);
      this.maganeUsers();
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

  ngOnInit() {
  }

  maganeUsers() {
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
    }
  }

  manageProjects() {
    for (let i = 0; i < this.projects.length; i++) {
      this.countedProjects += 1;
      this.totalBalanceOfOrders += this.projects[i].balance
      if (this.projects[i].isactive == 0) {
        this.countedDeletedProjects += 1;
      }
      if (this.projects[i].isactive == 1) {
        this.countActiveProjects += 1;
      }
      if (this.projects[i].isactive == 0) {
        this.countPassiveProjects += 1;
      }
    }
    for (let i = 0; i < this.projects.length; i++) {
      if (this.countedMaxDonation < this.projects[i].donation) {
        this.countedMaxDonation = this.projects[i].donation;
      }
    }
    for (let i = 0; i < this.projects.length; i++) {
      if (this.countedMinDonation > this.projects[i].donation) {
        this.countedMinDonation = this.projects[i].donation;
      }
    }
    this.countedAverageDonaton = this.totalBalanceOfOrders / this.countedProjects
    console.log('Count Projects', this.countedProjects);
    console.log(this.countActiveProjects);
  }



}
