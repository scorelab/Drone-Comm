import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {DroneRequest} from "../models/drone-request.model";
import {CustomMessage} from "../models/custom-message.model";
/**
 * @author Amila Karunathilaka
 */
@Injectable()
export class DroneRequestService {

  private _model;

  constructor(private restService: RestService) {

  }

  createDroneRequest(droneRequest: DroneRequest) {
    const url = this.restService.getBaseUrl(this._model);
    return this.restService.post(url, droneRequest).
    toPromise().
    then(response =>
      response.json() as CustomMessage)
  }
}
