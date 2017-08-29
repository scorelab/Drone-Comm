/**
 * @author Amila Karunathilaka
 */

export class DroneRequest{
  id: number;
  type: string;
  title: string;
  description: string;
  location: string;
  period: string; // TODO date type check
  priceRange: number[] = new Array();
  areaCoordinates: number[][] = new Array();

  constructor() {
  }
}
