import {Inject, Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {UtilService} from "./util.service";
import {User} from "../models/user.model";
import {JwtService} from "./jwt.service";

/**
 * @author Amila Karunathilaka
 */
@Injectable()
export class AuthService {

  private baseUrl;

  constructor(private http: Http, @Inject(UtilService) private utilService: UtilService) {
    this.baseUrl = this.utilService.getBaseUrl("authenticate");
  }

  login(user: User) {
    console.log(user.name + "   " + user.password);
    let url: string = this.baseUrl + "/" + user.name + "/" +user.password;
    console.log(url);
    let contentHeader: Headers = new Headers();
    contentHeader.append("Content-Type", "application/json");
    return this.http.post(url, '', {
      headers: contentHeader
    });
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  /**
   * Whether user is authorized to access the dashboard or other UI components
   * @returns {undefined}
   */
  static isAuthorized() {
    return JwtService.hasToken();
  }

  /**
   * logs out the user from the app. ie. deletes the token.
   */
  static logout() {
    JwtService.removeToken();
    window.location.assign("/login");
    window.location.reload();
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  {provide: AuthService, useClass: AuthService}
];
