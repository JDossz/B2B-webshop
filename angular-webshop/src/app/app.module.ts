import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { FusionChartsModule } from 'angular-fusioncharts';
// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme)

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateUsersComponent } from './page/create-users/create-users.component';
import { NavComponent } from './nav/nav.component';
import { OrdersComponent } from './page/orders/orders.component';
import { UpdateOrdersComponent } from './page/update-orders/update-orders.component';
import { UpdateUsersComponent } from './page/update-users/update-users.component';
import { UsersComponent } from './page/users/users.component';
import { ProjectAddComponent } from './page/project-add/project-add.component';
import { ProjectEditComponent } from './page/project-edit/project-edit.component'
import { ProjectsComponent } from './page/projects/projects.component';
import { BasketComponent } from './page/basket/basket.component';
import { IndexComponent } from './page/index/index.component';
import { SearchPipe } from './pipe/search.pipe';
import { StatisticsBasicComponent } from './page/statistics-basic/statistics-basic.component';
import { CategoryComponent } from './page/category/category.component';
import { CategoryAddComponent } from './page/category/category-add/category-add.component';
import { CategoryEditComponent } from './page/category/category-edit/category-edit.component';
import { StatisticsComponent } from './page/statistics/statistics.component';
import { Dynamic1Component } from './charts/dynamic1/dynamic1.component';
import { Pie1Component } from './charts/pie1/pie1.component';
import { OrderDetailsComponent } from './page/order-details/order-details.component';
import { DatefilterPipe } from './pipe/datefilter.pipe';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { Barchart1Component } from './charts/barchart1/barchart1.component';

@NgModule({
  declarations: [
    AppComponent,
    BasketComponent,
    OrdersComponent,
    ProjectsComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    UpdateOrdersComponent,
    UsersComponent,
    UpdateUsersComponent,
    CreateUsersComponent,
    NavComponent,
    IndexComponent,
    SearchPipe,
    StatisticsBasicComponent,
    CategoryComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    StatisticsComponent,
    Dynamic1Component,
    Pie1Component,
    OrderDetailsComponent,
    DatefilterPipe,
    DashboardComponent,
    Barchart1Component,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    BrowserModule,
    FusionChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
