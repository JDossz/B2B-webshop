import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import 'chart.js';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dynamic1',
  templateUrl: './dynamic1.component.html',
  styleUrls: ['./dynamic1.component.css']
})
export class Dynamic1Component implements OnInit {
  orders: any
  orders$: BehaviorSubject<any> = this.dataService.orderList;
  baskets: any
  baskets$: BehaviorSubject<any> = this.dataService.basketList;
  categories: any
  categories$: BehaviorSubject<any> = this.dataService.basketList;
  projects: any
  projects$: BehaviorSubject<any> = this.dataService.projectList;
  users: any
  users$: BehaviorSubject<any> = this.dataService.userList;
  countUsers$: BehaviorSubject<any> = this.dataService.userList;
  countUsers: any;
  countOrders: any

  constructor (private dataService: DataService) {
    // this.dataService.readTableByQuery('users', { select: 'count(id) as count', admin: 1 });
    // this.countUsers$.subscribe(data => {
    //   console.log(data[0]);
    //   this.countUsers = data[0].count;
    // })
    this.dataService.readTableByQuery('orders', {});
    this.dataService.readTableByQuery('baskets', {});
    this.dataService.readTableByQuery('categories', {});
    this.dataService.readTableByQuery('projects', {});
    this.dataService.readTableByQuery('users', {});

    this.orders$.subscribe(data => {
      this.orders = data;
      // console.log('Orders: ', this.orders);
    });
    this.baskets$.subscribe(data => {
      this.baskets = data;
      // console.log('Baskets: ', this.baskets);
    });
    this.categories$.subscribe(data => {
      this.categories = data;
      // console.log('Categories: ', this.categories);
    });
    this.projects$.subscribe(data => {
      this.projects = data;
      // console.log('Projects: ', this.projects);
    });
    this.users$.subscribe(data => {
      this.users = data;
      // console.log('Users: ', this.users);
    });
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
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Active' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Passive' }
  ];


  ngOnInit() {
  }

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
