import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import 'chart.js';
import { BehaviorSubject, Observable } from 'rxjs';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-dynamic1',
  templateUrl: './dynamic1.component.html',
  styleUrls: ['./dynamic1.component.css']
})
export class Dynamic1Component implements OnInit {
  constructor (private statisticsService: StatisticsService) { }

  //Variables
  projects: Observable<any>
  projects$: Observable<any> = this.statisticsService.readTableByQuery('projects', {})
  users: Observable<any>
  users$: Observable<any> = this.statisticsService.readTableByQuery('users', {})
  categories: [] = []
  categories$: Observable<any> = this.statisticsService.readTableByQuery('categories', {})
  orders: [] = []
  orders$: Observable<any> = this.statisticsService.readTableByQuery('orders', {})
  baskets: [] = []
  baskets$: Observable<any> = this.statisticsService.readTableByQuery('baskets', {})

  ngOnInit() {
    this.statisticsService.readTableByQuery('projects', {}).subscribe(data => {
      this.projects = data;
      // console.log('Projects: ', this.projects);
      err => console.log(err);
    })

    this.statisticsService.readTableByQuery('users', {}).subscribe(data => {
      this.users = data;
      // console.log('Users: ', this.users);
      err => console.log(err);
    })

    this.statisticsService.readTableByQuery('categories', {}).subscribe(data => {
      this.categories = data;
      // console.log('Categories: ', this.categories);
      err => console.log(err);
    })

    this.statisticsService.readTableByQuery('orders', {}).subscribe(data => {
      this.orders = data;
      // console.log('Orders: ', this.orders);
      err => console.log(err);
    })

    this.statisticsService.readTableByQuery('baskets', {}).subscribe(data => {
      this.baskets = data;
      // console.log('Baskets: ', this.baskets);
      err => console.log(err);
    })

    let usersArray = this.users
    this.counter(usersArray)
  }

  counter(usersArray) {
    // console.log('UsersArray', usersArray);
  }

  //Chart

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['Orders', 'Users', 'Projects'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80], label: 'Active' },
    { data: [28, 48, 40], label: 'Passive' }
  ];


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
