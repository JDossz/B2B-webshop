import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pie1',
  templateUrl: './pie1.component.html',
  styleUrls: ['./pie1.component.css']
})
export class Pie1Component implements OnInit {
  orders: any
  orders$: Observable<any> = this.statisticsService.readTableByQuery('orders', {});
  baskets: any
  baskets$: Observable<any> = this.statisticsService.readTableByQuery('baskets', {});
  categories: any
  categories$: Observable<any> = this.statisticsService.readTableByQuery('categories', {});
  projects: any
  projects$: Observable<any> = this.statisticsService.readTableByQuery('projects', {});
  users: any
  users$: Observable<any> = this.statisticsService.readTableByQuery('users', {});
  onlyCategories: any[] = [];
  countedUsers: number = 0;
  countedAdmins: number = 0;
  countedCivils: number = 0;

  constructor (private statisticsService: StatisticsService) {
    this.statisticsService.readTableByQuery('orders', {});
    this.statisticsService.readTableByQuery('baskets', {});
    this.statisticsService.readTableByQuery('categories', {});
    this.statisticsService.readTableByQuery('projects', {});
    this.statisticsService.readTableByQuery('users', {});

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
      this.getCategories();
    });
    this.projects$.subscribe(data => {
      this.projects = data;
      // console.log('Projects: ', this.projects);
    });
    this.users$.subscribe(data => {
      this.users = data;
      // console.log('Users: ', this.users);
      this.countUsers();
    });

  }

  countUsers() {

  }

  getCategories() {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.onlyCategories.indexOf(this.categories[i].category) == -1) {
        this.onlyCategories.push(this.categories[i].category)
      }
      // console.log('onlyCategories: ', this.onlyCategories);
      return this.onlyCategories;
    }
  }

  // if (this.onlyCategories.indexOf(this.categories[i])) == -1) {
  // this.onlyCategories.push(this.categories)


  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  // console.log(object);

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels() {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }

  addSlice() {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice() {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }
}
