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
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { GastronomyComponent } from './pages/dashboard-pages/gastronomy/gastronomy.component';
import { InventoryComponent } from './pages/dashboard-pages/inventory/inventory.component';
import { InvoicingComponent } from './pages/dashboard-pages/invoicing/invoicing.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ModuleNavigationComponent } from './components/module-navigation/module-navigation.component';
import { DishesPageComponent } from './pages/dashboard-pages/gastronomy/dishes-page/dishes-page.component';
import { MenusPagesComponent } from './pages/dashboard-pages/gastronomy/menus-pages/menus-pages.component';
import { PlansPagesComponent } from './pages/dashboard-pages/gastronomy/plans-pages/plans-pages.component';
import { GroupsPagesComponent } from './pages/dashboard-pages/gastronomy/groups-pages/groups-pages.component';
import { MultiSelectSearchComponent } from './components/multi-select-search/multi-select-search.component';
import { UniversalTableComponent } from './components/universal-table/universal-table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

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
    EnterprisesPageComponent,
    SettingsPageComponent,
    GastronomyComponent,
    InventoryComponent,
    InvoicingComponent,
    MultiSelectComponent,
    PaginationComponent,
    NotFoundPageComponent,
    ModuleNavigationComponent,
    DishesPageComponent,
    MenusPagesComponent,
    PlansPagesComponent,
    GroupsPagesComponent,
    MultiSelectSearchComponent,
    UniversalTableComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
