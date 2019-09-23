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


const routes: Routes = [
  { path: 'api/projects', component: ProjectsComponent },
  { path: 'projectAdd', component: ProjectAddComponent },
  { path: 'projectEdit/:seo', component: ProjectEditComponent },
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: 'orders/:id',
    component: UpdateOrdersComponent
  },
  {
    path: 'create-order',
    component: CreateOrdersComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/:id',
    component: UpdateUsersComponent
  },
  {
    path: 'create-user',
    component: CreateOrdersComponent
  },
  
  { path: '**', component: AppComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
