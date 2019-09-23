import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceTestComponent } from './components/service-test/service-test.component';

const routes: Routes = [
  {
    path: '**',
    component: ServiceTestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
