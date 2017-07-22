import {Component, ViewContainerRef} from "@angular/core";
import {JwtService} from "../../services/jwt.service";
import {ToastsManager} from "ng2-toastr";
import {AuthService} from "../../services/auth.service";
/**
 * @author Amila Karunathilaka
 */
@Component({
  selector: 'drone-comm-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {
  title = 'Drone Communnity';

  constructor(private toastr: ToastsManager, vcr: ViewContainerRef){
    this.toastr.setRootViewContainerRef(vcr);
  }

  hasToken() {
    return JwtService.hasToken();
  }

  doLogOut(){
    AuthService.logout();
  }
}
