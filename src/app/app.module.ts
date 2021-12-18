import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { AppPageComponent } from './pages/app-page/app-page.component';
import { NavbarComponent } from './pages/app-page/navbar/navbar.component';
import { ParticipantsPageComponent } from './pages/dashboard-pages/gastronomy/participants-page/participants-page.component';
import { WarehousePageComponent } from './pages/dashboard-pages/inventory/warehouse-page/warehouse-page.component';
import { SuppliersPageComponent } from './pages/dashboard-pages/invoicing/suppliers-page-router/suppliers-page/suppliers-page.component';
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
import {LoaderService} from "./services/common/loader/loader.service";
import { SpinnerWrapperComponent } from './components/spinner-wrapper/spinner-wrapper.component';
import { TableContentIngredientsComponent } from './pages/dashboard-pages/gastronomy/dishes-page/table-content-ingredients/table-content-ingredients.component';
import { TableContentProductsComponent } from './pages/dashboard-pages/gastronomy/dishes-page/table-content-products/table-content-products.component';
import { TableContentDishesComponent } from './pages/dashboard-pages/gastronomy/menus-pages/table-content-dishes/table-content-dishes.component';
import { TableContentMealsComponent } from './pages/dashboard-pages/gastronomy/menus-pages/table-content-meals/table-content-meals.component';
import { TableContentMenusComponent } from './pages/dashboard-pages/gastronomy/plans-pages/table-content-menus/table-content-menus.component';
import { TableContentPlanDetailsComponent } from './pages/dashboard-pages/gastronomy/plans-pages/table-content-plan-details/table-content-plan-details.component';
import { TableContentPlansComponent } from './pages/dashboard-pages/gastronomy/groups-pages/table-content/plans/table-content-plans/table-content-plans.component';
import { TableContentListComponent } from './pages/dashboard-pages/gastronomy/groups-pages/table-content/plans/table-content-list/table-content-list.component';
import { TableContentSelectedComponent } from './pages/dashboard-pages/gastronomy/groups-pages/table-content/participants/table-content-selected/table-content-selected.component';
import { TableContentAvailableComponent } from './pages/dashboard-pages/gastronomy/groups-pages/table-content/participants/table-content-available/table-content-available.component';
import { ProductsPageComponent } from './pages/dashboard-pages/inventory/products-page/products-page.component';
import { CategoriesPageComponent } from './pages/dashboard-pages/inventory/categories-page/categories-page.component';
import { AllergensPageComponent } from './pages/dashboard-pages/inventory/allergens-page/allergens-page.component';
import { InventoryStatisticPageComponent } from './pages/dashboard-pages/inventory/inventory-statistic-page/inventory-statistic-page.component';
import { DocumentsPageComponent } from './pages/dashboard-pages/invoicing/documents-page-router/documents-page/documents-page.component';
import { StatisticsPageComponent } from './pages/dashboard-pages/invoicing/statistics-page/statistics-page.component';
import { DocumentTypesComponent } from './pages/dashboard-pages/invoicing/documents-page-router/document-types/document-types.component';
import { SupplierContactsComponent } from './pages/dashboard-pages/invoicing/suppliers-page-router/supplier-contacts/supplier-contacts.component';
import { SuppliersPageRouterComponent } from './pages/dashboard-pages/invoicing/suppliers-page-router/suppliers-page-router.component';
import { DocumentsPageRouterComponent } from './pages/dashboard-pages/invoicing/documents-page-router/documents-page-router.component';
import { DocumentProductsComponent } from './pages/dashboard-pages/invoicing/documents-page-router/document-products/document-products.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';

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
    SpinnerComponent,
    SpinnerWrapperComponent,
    TableContentIngredientsComponent,
    TableContentProductsComponent,
    TableContentDishesComponent,
    TableContentMealsComponent,
    TableContentMenusComponent,
    TableContentPlanDetailsComponent,
    TableContentPlansComponent,
    TableContentListComponent,
    TableContentSelectedComponent,
    TableContentAvailableComponent,
    ProductsPageComponent,
    CategoriesPageComponent,
    AllergensPageComponent,
    InventoryStatisticPageComponent,
    DocumentsPageComponent,
    StatisticsPageComponent,
    DocumentTypesComponent,
    SupplierContactsComponent,
    SuppliersPageRouterComponent,
    DocumentsPageRouterComponent,
    DocumentProductsComponent,
    PasswordResetComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [
    LoaderService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
