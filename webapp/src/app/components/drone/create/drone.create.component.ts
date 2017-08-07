import {Component, OnInit, ViewChild} from "@angular/core";
import {DroneService} from "../../../services/drone.service";
import {ToastsManager} from "ng2-toastr";
import {Drone, Specification} from "../../../models/drone.model";
import {CustomMessage} from "../../../models/custom-message.model";
import {EditableTableComponent} from "../../common/editable-table/editable-table.component";
/**
 * @author Amila Karunathilaka
 */

@Component({
  selector: 'drone-comm-drone-create',
  templateUrl: './drone.create.component.html'
})
export class DroneCreateComponent implements OnInit{

  drone: Drone = new Drone();

  returnUrl: string;
  submitted: boolean = false;

  @ViewChild("cameraSpecTable")
  cameraSpecTable: EditableTableComponent;

  @ViewChild("cameraGimbalSpecTable")
  cameraGimbalSpecTable: EditableTableComponent;

  @ViewChild("otherSpecTable")
  otherSpecTable: EditableTableComponent;

  tableHeaders = ['Specification', ' '];
  cameraSpecData;
  cameraGimbalSpecData;
  otherSpecData;

  constructor(private droneService: DroneService, private toastr: ToastsManager) {
    this.cameraSpecData = this.toArray(this.drone.cameraSpec);
    this.cameraGimbalSpecData = this.toArray(this.drone.cameraGimbalSpec);
    this.otherSpecData = this.toArray(this.drone.otherSpec);
  }

  ngOnInit(): void {
  //  this.cameraSpecData= this.toSpec(this.cameraSpecTable.tableRows);
  }

  createDrone() {
    if (!this.submitted) {
      this.submitted = true;
      this.drone.cameraSpec = this.toSpec(this.cameraSpecTable.tableRows);
      console.log('1');
      this.drone.cameraGimbalSpec = this.toSpec(this.cameraGimbalSpecTable.tableRows);
      console.log('2');
      this.drone.otherSpec = this.toSpec(this.otherSpecTable.tableRows);
      console.log(this.drone);
      /*this.droneService.createDrone(this.drone).then(CustomMessage => {
        this.toastr.success(CustomMessage.msg, "Drone successfully created");
      }).catch(e => {
        this.toastr.error(e, "Drone creation failed")
      });*/

    }
  }

  toArray(specs: Specification[]): string[][] {
    let specArray: string[][] = new Array();
    for (let spec of specs) {
      specArray.push([spec.spec, spec.value]);
    }

    return specArray;
  }

  toSpec(specArray: string[][]): Specification[]{
    let specs: Specification[] = new Array();
    for (let element of specArray) {
      let spec: Specification = new Specification();
      spec.spec = element[0];
      spec.value = element[1];
      console.log(spec);
      specs.push(spec);
    }
    return specs;
  }


}
