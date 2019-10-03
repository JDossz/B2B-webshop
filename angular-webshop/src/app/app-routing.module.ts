import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateOrdersComponent } from './page/create-orders/create-orders.component';
import { OrdersComponent } from './page/orders/orders.component';
import { UpdateOrdersComponent } from './page/update-orders/update-orders.component';
import { UpdateUsersComponent } from './page/update-users/update-users.component';
import { UsersComponent } from './page/users/users.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectsComponent } from './projects/projects.component';
import { CreateUsersComponent } from './page/create-users/create-users.component';
import { BasketComponent } from './page/basket/basket.component';
import { StatisticsBasicComponent } from './page/statistics-basic/statistics-basic.component';
import { CategoryComponent } from './page/category/category.component';
import { CategoryEditComponent } from './page/category/category-edit/category-edit.component';
import { CategoryAddComponent } from './page/category/category-add/category-add.component';
import { StatisticsComponent } from './page/statistics/statistics.component';


const routes: Routes = [
  { path: 'api/projects', component: ProjectsComponent },
  { path: 'dashboard', component: StatisticsComponent },
  { path: 'projectAdd', component: ProjectAddComponent },
  { path: 'projectEdit/:seo', component: ProjectEditComponent },
  { path: 'api/categories', component: CategoryComponent },
  { path: 'category-edit/:id', component: CategoryEditComponent },
  { path: 'category-add', component: CategoryAddComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:id', component: UpdateOrdersComponent },
  { path: 'create-order', component: CreateOrdersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UpdateUsersComponent },
  { path: 'create-user', component: CreateUsersComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'statistics-basic', component: StatisticsBasicComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', component: AppComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
