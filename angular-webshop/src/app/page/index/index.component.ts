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
  countedFundedProjects: number = 0;


  //donations
  donations$: Observable<any> = this.statisticsService.readTableByQuery('orders', {});
  donations: any
  totalBalanceOfdonations: number = 0;
  countedDonations: number = 0;
  donationstatus1: number = 0;
  donationstatus2: number = 0;
  donationstatus3: number = 0;
  donationstatus4: number = 0;
  donationstatus5: number = 0;


  constructor(private statisticsService: StatisticsService) {
    this.users$.subscribe(data => {
      this.users = data;
      // console.log('Users: ', this.users);
      this.maganeUsers();
    });

    this.donations$.subscribe(data => {
      this.donations = data;
      // console.log('Users: ', this.users);
      this.manageDonations();
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
    for (let i = 0; i < this.users.length; i++) {
      this.countedUsers++

      if (this.users[i].admin == 1) {
        this.countedAdmins++
      }
      if (this.users[i].admin == 0) {
        this.countedCivils++
      }
    }
  }


  manageDonations() {
    for (let i = 0; i < this.donations.length; i++) {
      this.countedDonations++
      if (this.donations[i].status == 1) {
        this.donationstatus1++
      }
      if (this.donations[i].status == 2) {
        this.donationstatus2++
      }
      if (this.donations[i].status == 3) {
        this.donationstatus3++
      }
      if (this.donations[i].status == 4) {
        this.donationstatus4++
      }
      if (this.donations[i].status == 5) {
        this.donationstatus5++
      }
    }
  }

  manageProjects() {
    for (let i = 0; i < this.projects.length; i++) {
      this.countedProjects += 1;
      this.totalBalanceOfdonations += this.projects[i].balance
      if (this.projects[i].isactive == 0) {
        this.countedDeletedProjects += 1;
      }
      if (this.projects[i].isactive == 1) {
        this.countActiveProjects += 1;
      }
      if (this.projects[i].isactive == 0) {
        this.countPassiveProjects += 1;
      }
      if (this.projects[i].balance >= this.projects[i].goal) {
        this.countedFundedProjects++
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
    this.countedAverageDonaton = this.totalBalanceOfdonations / this.countedProjects
  }
}
