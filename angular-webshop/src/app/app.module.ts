import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { FormsModule } from '@angular/forms';
import { ProjectEditComponent } from './project-edit/project-edit.component'
@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectAddComponent,
    ProjectEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
