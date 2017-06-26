import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AUTH_PROVIDERS, AuthService} from "./services/auth.service";
import {LoginComponent} from "./components/auth/login.component";
import {JwtService} from "./services/jwt.service";
import {RestService} from "./services/rest.service";
import {UtilService} from "./services/util.service";
import {AuthGuard} from "./components/auth/guards/auth.guard";
import {LoginGuard} from "./components/auth/guards/login.guard";
import {BaseComponent} from "./components/base/base.component";
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    BaseComponent,
    AppComponent,
    LoginComponent,
   // RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    JwtService,
    RestService,
    UtilService,
    AuthGuard,
    LoginGuard
  ],
  bootstrap: [BaseComponent]
})
export class AppModule { }
