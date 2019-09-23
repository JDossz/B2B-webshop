import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AgmCoreModule } from '@agm/core';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { FormsModule } from '@angular/forms';
import { ProjectEditComponent } from './project-edit/project-edit.component'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

@NgModule({
@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    AdminLayoutComponent,
    HttpClientModule,
    FormsModule,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
