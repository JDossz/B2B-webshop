import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './page/orders/orders.component';
import { UpdateOrdersComponent } from './page/update-orders/update-orders.component';
import { CreateOrdersComponent } from './page/create-orders/create-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    UpdateOrdersComponent,
    CreateOrdersComponent,
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
