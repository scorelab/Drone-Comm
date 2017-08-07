/**
 * @author Amila Karunathilaka
 */

export class Drone {
  name: string;
  weight: number;
  maxFightTime: number;
  maxCelling: number;
  satelliteSystem: string;
  cameraSpec: Specification[] = new Array();
  cameraGimbalSpec: Specification[] = new Array();
  otherSpec: Specification[] = new Array();

  constructor() {
  }
}

export class Specification{
  spec: string;
  value: string;

  constructor() {
  }
}

