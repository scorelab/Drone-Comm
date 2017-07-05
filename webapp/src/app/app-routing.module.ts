import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/auth/login.component";
import {LoginGuard} from "./components/auth/guards/login.guard";

const  appRoutes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]}
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
