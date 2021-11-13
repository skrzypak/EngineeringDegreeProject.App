import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInPageComponent,
    SignUpPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
