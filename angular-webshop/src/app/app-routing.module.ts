import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { AppComponent } from './app.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';


const routes: Routes = [
  { path: 'api/projects', component: ProjectsComponent },
  { path: 'projectAdd', component: ProjectAddComponent },
  { path: 'projectEdit/:seo', component: ProjectEditComponent },
  { path: '**', component: AppComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
