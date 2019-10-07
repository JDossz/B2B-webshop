import { Component } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-barchart1',
  templateUrl: './barchart1.component.html',
  styleUrls: ['./barchart1.component.css']
})
export class Barchart1Component {
  //Barchart
  dataSource: Object;
  chartConfig: Object;

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

  //Categories
  categories$: Observable<any> = this.statisticsService.readTableByQuery('categories', {});
  categories: any
  onlyCategories$: Observable<any> = this.statisticsService.readTableByQuery('categories', { select: "category" });
  onlyCategories: any
  onlyCategoriesArray: any[] = [];
  category1: number = 0;
  category2: number = 0;
  category3: number = 0;
  category4: number = 0;
  category5: number = 0;
  category6: number = 0;
  category7: number = 0;

  constructor (private statisticsService: StatisticsService) {
    // this.statisticsService.readTableByQuery('users', {});
    // this.statisticsService.readTableByQuery('orders', {});
    // this.statisticsService.readTableByQuery('projects', {});
    // this.statisticsService.readTableByQuery('categories', {});

    this.users$.subscribe(data => {
      this.users = data;
      // console.log('Users: ', this.users);
      // this.maganeUsers();
    });

    this.orders$.subscribe(data => {
      this.orders = data;
      // console.log('Users: ', this.users);
      // this.manageOrders();
    });

    this.projects$.subscribe(data => {
      this.projects = data;
      // console.log('Users: ', this.users);
      // this.manageProjects();
    });

    this.categories$.subscribe(data => {
      this.categories = data;
      // this.manageCategories();
      console.log('Categories: ', this.categories);
    });

    this.onlyCategories$.subscribe(data => {
      this.onlyCategories = data;
      this.manageCategories();
      // console.log('Only Categories: ', this.onlyCategories);
    });



    this.chartConfig = {
      width: '700',
      height: '400',
      type: 'column2d',
      dataFormat: 'json',
    };


  }

  manageCategories() {
    for (let i = 0; i < this.onlyCategories.length; i++) {
      this.onlyCategoriesArray.push(this.onlyCategories[i].category)
    }



    this.dataSource = {
      "chart": {
        "caption": "Countries With Most Oil Reserves [2017-18]",
        "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Country",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "K",
        "theme": "candy",
      },
      "data": [{
        "label": `${this.onlyCategoriesArray[0]}`,
        "value": "290"
      }, {
        "label": this.onlyCategoriesArray[1],
        "value": "260"
      }, {
        "label": this.onlyCategoriesArray[2],
        "value": "180"
      }, {
        "label": this.onlyCategoriesArray[3],
        "value": "140"
      }, {
        "label": this.onlyCategoriesArray[4],
        "value": "115"
      }, {
        "label": this.onlyCategoriesArray[5],
        "value": "100"
      }, {
        "label": this.onlyCategoriesArray[6],
        "value": "30"
      }]
    };
  }



}
