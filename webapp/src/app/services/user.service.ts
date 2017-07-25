import {Inject, Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, URLSearchParams} from "@angular/http";
import {UtilService} from "./util.service";
import {Profile} from "../models/profile.model";
/**
 * @author Amila Karunathilaka
 */
 @Injectable()
export class UserService {
  private baseUrl;

  constructor(private http: Http, @Inject(UtilService) private utilService: UtilService){
    this.baseUrl = this.utilService.getBaseUrl("register");
  }

  registerUser(profile:Profile) {
    let contentHeader: Headers = new Headers();
    contentHeader.append("Content-Type", "application/json");
    return this.http.post(this.baseUrl, JSON.stringify(profile), {
      headers: contentHeader
    });
  }

  verifyUser(id: string) {
    let contentHeader: Headers = new Headers();
    let requestOptionArgs = new RequestOptions();
    let params: URLSearchParams = new URLSearchParams();
    console.log("id", id);
    params.set("id", id);
    requestOptionArgs.headers = contentHeader;
    requestOptionArgs.params = params;
    contentHeader.append("Content-Type", "application/json");
    return this.http.get(this.utilService.getBaseUrl("verify"), requestOptionArgs);
  }

  resendEmailVerification(name: string) {
    return this.http.get(this.utilService.getResourceUrl("resend", name));
  }
}
