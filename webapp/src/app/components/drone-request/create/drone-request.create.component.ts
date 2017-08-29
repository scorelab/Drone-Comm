import {Component} from "@angular/core";
import {DroneRequest} from "../../../models/drone-request.model";
import {DroneRequestService} from "../../../services/drone-request.service";
import {ToastsManager} from "ng2-toastr";
/**
 * @author Amila Karunathilaka
 */

@Component({
  selector: 'drone-comm-drone-request-create',
  templateUrl: "./drone-request.create.component.html"
})
export class DroneRequestCreateComponent {

  droneRequest: DroneRequest = new DroneRequest();

  submitted: boolean = false;

  constructor(private droneRequestService: DroneRequestService, private toastr: ToastsManager){

  }

  createDrone() {
    if (!this.submitted) {
      this.submitted = true;
      this.droneRequestService.createDroneRequest(this.droneRequest).then(CustomMessage => {
       this.toastr.success(CustomMessage.msg, "Drone Request successfully create");
       }).catch(e => {
       this.toastr.error(e, "Drone request creation failed")
       });

    }
  }
}
