import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UsersComponent } from 'src/app/pages/users/users.component';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';
import { StatisticsComponent } from 'src/app/pages/statistics/statistics.component';
import { RiportsComponent } from 'src/app/pages/riports/riports.component';
import { DiaryComponent } from 'src/app/pages/diary/diary.component';
import { MainDashboardComponent } from 'src/app/pages/main-dashboard/main-dashboard.component';
import { DatabaseTablesComponent } from 'src/app/pages/database-tables/database-tables.component';
import { ErrorPageComponent } from 'src/app/pages/error-page/error-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    UsersComponent,
    OrdersComponent,
    StatisticsComponent,
    RiportsComponent,
    DiaryComponent,
    MainDashboardComponent,
    DatabaseTablesComponent,
    ErrorPageComponent,

    // RtlComponent
  ]
})
export class AdminLayoutModule { }
