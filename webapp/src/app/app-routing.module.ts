import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/auth/login.component";
import {LoginGuard} from "./components/auth/guards/login.guard";
import {RegisterComponent} from "./components/register/register.component";
import {VerifyComponent} from "./components/register/verify/verify.component";
import {DroneCreateComponent} from "./components/drone/create/drone.create.component";
import {AuthGuard} from "./components/auth/guards/auth.guard";

const  appRoutes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
  {path: 'verify', component: VerifyComponent, canActivate: [LoginGuard]},
//  {path: 'drone/create', component: DroneCreateComponent, canActivate: [AuthGuard]}

];

/**
 * @author Amila Karunathilaka
 */
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
