import { Component } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dataSource: Object;
  chartConfig: Object;
  //Users
  users$: Observable<any> = this.statisticsService.readTableByQuery('users', {});
  users: any;

  //Projects
  projects$: Observable<any> = this.statisticsService.readTableByQuery('projects', {});
  projects: any;

  //Orders
  orders$: Observable<any> = this.statisticsService.readTableByQuery('orders', {});
  orders: any;

  //Categories
  categories$: Observable<any> = this.statisticsService.readTableByQuery('categories', {});
  categories: any;

  constructor (private statisticsService: StatisticsService) {
    this.statisticsService.readTableByQuery('users', {});
    this.statisticsService.readTableByQuery('orders', {});
    this.statisticsService.readTableByQuery('projects', {});
    this.statisticsService.readTableByQuery('categories', {});


    this.users$.subscribe(data => {
      this.users = data;
      // this.maganeUsers();
    });

    this.orders$.subscribe(data => {
      this.orders = data;
      // this.manageOrders();
    });

    this.projects$.subscribe(data => {
      this.projects = data;
      // this.manageProjects();
    });

    this.categories$.subscribe(data => {
      this.categories = data;
      console.log(this.categories);
      // this.maganeCategories();
    });



    this.chartConfig = {
      width: '700',
      height: '400',
      type: 'column2d',
      dataFormat: 'json',
    };

    this.dataSource = {
      "chart": {
        "caption": "Countries With Most Oil Reserves [2017-18]",
        "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Country",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "K",
        "theme": "fusion",
      },
      "data": [{
        "label": "Venezuela",
        "value": "290"
      }, {
        "label": "Saudi",
        "value": "260"
      }, {
        "label": "Canada",
        "value": "180"
      }, {
        "label": "Iran",
        "value": "140"
      }, {
        "label": "Russia",
        "value": "115"
      }, {
        "label": "UAE",
        "value": "100"
      }, {
        "label": "US",
        "value": "30"
      }, {
        "label": "China",
        "value": "30"
      }]
    };
  }
}
