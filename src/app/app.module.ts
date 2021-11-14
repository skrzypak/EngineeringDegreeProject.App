import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInPageComponent,
    SignUpPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
