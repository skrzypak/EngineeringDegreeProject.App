import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from "./pages/sign-up-page/sign-up-page.component";
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'login', component: LogInPageComponent }
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
