import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignUpPageComponent} from "./pages/sign-up-page/sign-up-page.component";
import {LogInPageComponent} from './pages/log-in-page/log-in-page.component';
import {AuthGuard} from "./services/guards/auth/auth.guard";
import {AppPageComponent} from "./pages/app-page/app-page.component";
import {NoAuthGuard} from "./services/guards/noAuth/no-auth.guard";
import {EnterprisesPageComponent} from "./pages/dashboard-pages/auth/enterprises-page/enterprises-page.component";
import {ParticipantsPageComponent} from "./pages/dashboard-pages/gastronomy/participants-page/participants-page.component";
import {WarehousePageComponent} from "./pages/dashboard-pages/inventory/warehouse-page/warehouse-page.component";
import {SuppliersPageComponent} from "./pages/dashboard-pages/invoicing/suppliers-page/suppliers-page.component";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {GastronomyComponent} from "./pages/dashboard-pages/gastronomy/gastronomy.component";
import {InventoryComponent} from "./pages/dashboard-pages/inventory/inventory.component";
import {InvoicingComponent} from "./pages/dashboard-pages/invoicing/invoicing.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {DishesPageComponent} from "./pages/dashboard-pages/gastronomy/dishes-page/dishes-page.component";
import {GroupsPagesComponent} from "./pages/dashboard-pages/gastronomy/groups-pages/groups-pages.component";
import {PlansPagesComponent} from "./pages/dashboard-pages/gastronomy/plans-pages/plans-pages.component";
import {MenusPagesComponent} from "./pages/dashboard-pages/gastronomy/menus-pages/menus-pages.component";
import {ProductsPageComponent} from "./pages/dashboard-pages/inventory/products-page/products-page.component";
import {CategoriesPageComponent} from "./pages/dashboard-pages/inventory/categories-page/categories-page.component";
import {AllergensPageComponent} from "./pages/dashboard-pages/inventory/allergens-page/allergens-page.component";
import {
  InventoryStatisticPageComponent
} from "./pages/dashboard-pages/inventory/inventory-statistic-page/inventory-statistic-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/enterprise', pathMatch: 'full'},
  {path: 'signup', component: SignUpPageComponent, canActivate: [NoAuthGuard]},
  {path: 'login', component: LogInPageComponent, canActivate: [NoAuthGuard]},
  {
    path: '', component: AppPageComponent, canActivate: [AuthGuard],
    children: [
      {path:'', redirectTo: 'enterprise', pathMatch: 'full'},
      {path: 'enterprise', component: EnterprisesPageComponent},
      {
        path: 'gastronomy', component: GastronomyComponent,
        children: [
          {path:'', redirectTo: 'groups', pathMatch: 'full'},
          {path: 'groups', component: GroupsPagesComponent},
          {path: 'plans', component: PlansPagesComponent},
          {path: 'menus', component: MenusPagesComponent},
          {path: 'dishes', component: DishesPageComponent},
          {path: 'participants', component: ParticipantsPageComponent},
        ]
      },
      {
        path: 'inventory', component: InventoryComponent,
        children: [
          {path:'', redirectTo: 'warehouse', pathMatch: 'full'},
          {path: 'warehouse', component: WarehousePageComponent},
          {path: 'products', component: ProductsPageComponent},
          {path: 'categories', component: CategoriesPageComponent},
          {path: 'allergens', component: AllergensPageComponent},
          {path: 'statistics', component: InventoryStatisticPageComponent},
        ]
      },
      {
        path: 'invoicing', component: InvoicingComponent,
        children: [
          {path:'', redirectTo: 'suppliers', pathMatch: 'full'},
          {path: 'statistics', component: SuppliersPageComponent},
          {path: 'documents', component: SuppliersPageComponent},
          {path: 'suppliers', component: SuppliersPageComponent},
        ]
      },
      {path: 'settings', component: SettingsPageComponent},
    ]
  },
  {path: '404', component: NotFoundPageComponent},
  {path: '**', redirectTo: '/enterprise'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
