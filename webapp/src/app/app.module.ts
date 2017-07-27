import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

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
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule, ToastsManager} from "ng2-toastr";
import {RegisterVerificationComponent} from "./components/register/resendverification/register.verification.component";
import {NgSemanticModule} from "ng-semantic/ng-semantic";
import {VerifyComponent} from "./components/register/verify/verify.component";
import {UserService} from "./services/user.service";
import {DroneCreateComponent} from "./components/drone/create/drone.create.component";

@NgModule({
  declarations: [
    BaseComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterVerificationComponent,
    VerifyComponent,
    //DroneCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSemanticModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [
    AuthService,
    JwtService,
    RestService,
    UtilService,
    UserService,
    ToastsManager,
    AuthGuard,
    LoginGuard,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [BaseComponent]
})
export class AppModule { }
