import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BasketComponent } from "./page/basket/basket.component";
import { CategoryComponent } from "./page/category/category.component";
import { CategoryAddComponent } from "./page/category/category-add/category-add.component";
import { CategoryEditComponent } from "./page/category/category-edit/category-edit.component";
import { CreateUsersComponent } from "./page/create-users/create-users.component";
import { IndexComponent } from "./page/index/index.component";
import { OrdersComponent } from "./page/orders/orders.component";
import { OrderDetailsComponent } from "./page/order-details/order-details.component";
import { ProjectsComponent } from "./page/projects/projects.component";
import { ProjectAddComponent } from "./page/project-add/project-add.component";
import { ProjectEditComponent } from "./page/project-edit/project-edit.component";
import { StatisticsComponent } from "./page/statistics/statistics.component";
import { UpdateOrdersComponent } from "./page/update-orders/update-orders.component";
import { UpdateUsersComponent } from "./page/update-users/update-users.component";
import { UsersComponent } from "./page/users/users.component";

const routes: Routes = [
  { path: "", component: StatisticsComponent },
  { path: "api/projects", component: ProjectsComponent },
  { path: "api/categories", component: CategoryComponent },
  { path: "basket", component: BasketComponent },
  { path: "category-add", component: CategoryAddComponent },
  { path: "category-edit/:id", component: CategoryEditComponent },
  { path: "create-user", component: CreateUsersComponent },
  { path: "orders", component: OrdersComponent },
  { path: "projectAdd", component: ProjectAddComponent },
  { path: "projectEdit/:seo", component: ProjectEditComponent },
  { path: "orders/:id", component: UpdateOrdersComponent },
  { path: "orders/details/:id", component: OrderDetailsComponent },
  { path: "users", component: UsersComponent },
  { path: "users/:id", component: UpdateUsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
