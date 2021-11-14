import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from "./pages/sign-up-page/sign-up-page.component";
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import {AuthGuard} from "./services/guards/auth/auth.guard";
import {AppPageComponent} from "./pages/app-page/app-page.component";
import {NoAuthGuard} from "./services/guards/noAuth/no-auth.guard";

const routes: Routes = [
  { path: '',   redirectTo: 'app', pathMatch: 'full' },
  { path: 'signup', component: SignUpPageComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LogInPageComponent, canActivate: [NoAuthGuard] },
  { path: 'app', component: AppPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
