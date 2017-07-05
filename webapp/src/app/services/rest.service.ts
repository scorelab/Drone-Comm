import {Inject, Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response, ResponseContentType, URLSearchParams} from "@angular/http";
import {UtilService} from "./util.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map"
import {AuthService} from "./auth.service";
import {JwtService} from "./jwt.service";
/**
 * @author Amila Karunathilaka
 */

@Injectable()
export class RestService {

  constructor(private http: Http, @Inject(UtilService)private utilService: UtilService) {

  }

  public getBaseUrl(model) {
    return this.utilService.getBaseUrl(model);
  }

  public  getResourceUrl(model, resource) {
    return this.utilService.getResourceUrl(model, resource);
  }

  public get(url,
             headers: Headers = new Headers(),
             searchParams: URLSearchParams = new URLSearchParams(),
             responseContentType: ResponseContentType = ResponseContentType.Json): Observable<Response> {
    this.addAuthHeader(headers);
    return this.http.get(url, this.getRequestOptions(headers, searchParams, responseContentType)).
    map(res => {
      return this.checkAuthorized(res);
    })
  }

  public post(url,
              body,
              headers: Headers = new Headers(),
              searchParams: URLSearchParams = new URLSearchParams(),
              responseContentType: ResponseContentType = ResponseContentType.Json): Observable<Response> {
    this.addAuthHeader(headers);
    return this.http.post(url, body, this.getRequestOptions(headers, searchParams, responseContentType)).
    map(res => {
      return this.checkAuthorized(res);
    })
  }


  private addAuthHeader(headers: Headers) {
    headers.append("Authorization", JwtService.getToken());
  }


  private checkAuthorized(res: Response): Response {
    if (res.status == 401) {
      AuthService.logout();
    } else {
      return res;
    }
  }

  private getRequestOptions(headers: Headers,
                            searchParams: URLSearchParams,
                            responseContentType: ResponseContentType): RequestOptions {
    let requestOptionsArgs = new RequestOptions();
    requestOptionsArgs.headers = headers;
    requestOptionsArgs.params = searchParams;
    requestOptionsArgs.responseType = responseContentType;
    return requestOptionsArgs;
  }
}

