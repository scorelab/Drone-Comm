import {Component} from "@angular/core";
import {JwtService} from "../../services/jwt.service";
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

  constructor(){
  }

  hasToken() {
    return JwtService.hasToken();
  }
}
