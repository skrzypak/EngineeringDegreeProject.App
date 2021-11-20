import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { AppPageComponent } from './pages/app-page/app-page.component';
import { NavbarComponent } from './pages/app-page/navbar/navbar.component';
import { ParticipantsPageComponent } from './pages/dashboard-pages/gastronomy/participants-page/participants-page.component';
import { WarehousePageComponent } from './pages/dashboard-pages/inventory/warehouse-page/warehouse-page.component';
import { SuppliersPageComponent } from './pages/dashboard-pages/invoicing/suppliers-page/suppliers-page.component';
import { EnterprisesPageComponent } from './pages/dashboard-pages/auth/enterprises-page/enterprises-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInPageComponent,
    SignUpPageComponent,
    AppPageComponent,
    NavbarComponent,
    ParticipantsPageComponent,
    WarehousePageComponent,
    SuppliersPageComponent,
    EnterprisesPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
