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

  //Query
  categoriesAndValues$: Observable<any> = this.statisticsService.readTableByQuery('categories', {
    from: 'INNER JOIN projects ON projects.categoryid = categories.id',
    select: 'categories.category AS category, COUNT(projects.categoryid) AS categorycount',
    groupBy: 'projects.categoryid',
  });
  categoriesAndValues: any;

  constructor(private statisticsService: StatisticsService) {
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
