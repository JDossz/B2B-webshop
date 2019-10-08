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
  categoriesAndValues$: Observable<any> = this.statisticsService.readTableByQuery('categories', {
    from: 'INNER JOIN projects ON projects.categoryid = categories.id',
    select: 'categories.category AS category, COUNT(projects.categoryid) AS categorycount',
    groupBy: 'projects.categoryid',
  });
  categoriesAndValues: any;


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
      // console.log('Categories: ', this.categories);
    });

    this.categoriesAndValues$.subscribe(data => {
      this.categoriesAndValues = data;
      this.manageCategories();
    });



    this.chartConfig = {
      width: '100%',
      height: '500',
      type: 'column2d',
      dataFormat: 'json',
    };
  }

  manageCategories() {
    this.dataSource = {
      "chart": {
        "caption": "Our projects by categories",
        "subCaption": "Last updated 1 minute(s) ago",
        "xAxisName": "©BETAG",
        "yAxisName": "",
        "numberSuffix": " pcs",
        "theme": "candy",
      },
      "data": [{
        "label": `${this.categoriesAndValues[0].category}`,
        "value": `${this.categoriesAndValues[0].categorycount}`
      }, {
        "label": `${this.categoriesAndValues[1].category}`,
        "value": `${this.categoriesAndValues[1].categorycount}`
      }, {
        "label": `${this.categoriesAndValues[2].category}`,
        "value": `${this.categoriesAndValues[2].categorycount}`
      }, {
        "label": `${this.categoriesAndValues[3].category}`,
        "value": `${this.categoriesAndValues[3].categorycount}`
      }, {
        "label": `${this.categoriesAndValues[4].category}`,
        "value": `${this.categoriesAndValues[4].categorycount}`
      }, {
        "label": `${this.categoriesAndValues[5].category}`,
        "value": `${this.categoriesAndValues[5].categorycount}`
      }, {
        "label": `${this.categoriesAndValues[6].category}`,
        "value": `${this.categoriesAndValues[6].categorycount}`
      }
      ]
    };
  }



}
