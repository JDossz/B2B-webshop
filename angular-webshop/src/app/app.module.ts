import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateOrdersComponent } from './page/create-orders/create-orders.component';
import { CreateUsersComponent } from './page/create-users/create-users.component';
import { NavComponent } from './nav/nav.component';
import { OrdersComponent } from './page/orders/orders.component';
import { UpdateOrdersComponent } from './page/update-orders/update-orders.component';
import { UpdateUsersComponent } from './page/update-users/update-users.component';
import { UsersComponent } from './page/users/users.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectEditComponent } from './project-edit/project-edit.component'
import { ProjectsComponent } from './projects/projects.component';
import { BasketComponent } from './page/basket/basket.component';
import { IndexComponent } from './page/index/index.component';
import { SearchPipe } from './pipe/search.pipe';
import { StatisticsBasicComponent } from './page/statistics-basic/statistics-basic.component';
import { StatisticsComponent } from './page/statistics/statistics.component';
import { Dynamic1Component } from './charts/dynamic1/dynamic1.component';

@NgModule({
  declarations: [
    AppComponent,
    BasketComponent,
    OrdersComponent,
    ProjectsComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    UpdateOrdersComponent,
    CreateOrdersComponent,
    UsersComponent,
    UpdateUsersComponent,
    CreateUsersComponent,
    NavComponent,
    IndexComponent,
    SearchPipe,
    StatisticsBasicComponent,
    StatisticsComponent,
    Dynamic1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
