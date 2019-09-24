import { Routes } from "@angular/router";

import { UsersComponent } from 'src/app/pages/users/users.component';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';
import { StatisticsComponent } from 'src/app/pages/statistics/statistics.component';
import { RiportsComponent } from 'src/app/pages/riports/riports.component';
import { DiaryComponent } from 'src/app/pages/diary/diary.component';
import { MainDashboardComponent } from 'src/app/pages/main-dashboard/main-dashboard.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "main-dashboard", component: MainDashboardComponent },
  { path: "users", component: UsersComponent },
  { path: "orders", component: OrdersComponent },
  { path: "statistics", component: StatisticsComponent },
  { path: "riports", component: RiportsComponent },
  { path: "diary", component: DiaryComponent },
  // { path: "rtl", component: RtlComponent }
];
