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

const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {path: 'signup', component: SignUpPageComponent, canActivate: [NoAuthGuard]},
  {path: 'login', component: LogInPageComponent, canActivate: [NoAuthGuard]},
  {
    path: 'app', component: AppPageComponent, canActivate: [AuthGuard],
    children: [
      {path: 'enterprise', component: EnterprisesPageComponent},
      {path: 'gastronomy/participants', component: ParticipantsPageComponent},
      {path: 'inventory/warehouse', component: WarehousePageComponent},
      {path: 'invoicing/suppliers', component: SuppliersPageComponent},
    ]
  }
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
