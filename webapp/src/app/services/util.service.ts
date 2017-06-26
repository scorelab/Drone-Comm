import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
/**
 * @author Amila Karunathilaka
 */

@Injectable()
export class UtilService {
  private PREFIX: string = environment.BASE_URL + "/";

  constructor() {

  }

  /**
   * This function builds the url that is corresponding to the REST controller of the provided model
   * @param model
   * @returns {string}
   */
  public getBaseUrl(model) {
    return this.PREFIX +
      model;
  }

  /**
   * This function builds the url that can be used to access a specified object a provided model
   * @param model
   * @param resource
   * @returns {string}
   */
  public getResourceUrl(model, resource) {
    return this.PREFIX +
        model +
        "/" +
        resource;
  }

}
