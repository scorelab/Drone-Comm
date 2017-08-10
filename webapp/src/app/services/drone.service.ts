import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import {RestService} from "./rest.service";
import {Drone} from "../models/drone.model";
import {CustomMessage} from "../models/custom-message.model";
/**
 * @author Amila Karunathilaka
 */
@Injectable()
export class DroneService {

  private _model = 'drone';

  constructor(private restService: RestService) {

  }

  createDrone(drone: Drone) {
    const url = this.restService.getBaseUrl(this._model);
    return this.restService.post(url, drone).
    toPromise().
    then(response =>
      response.json() as CustomMessage)
  }
}
