import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const headerOptions = {
  headers : new HttpHeaders().set('Content-Type', 'application/json')
                             .set('Accept', 'application/json')
};

@Injectable()
export class MainService {
  private endpoint = environment.API_ENDPOINT;

  constructor(private http: HttpClient) { }

  getWelcome(): Observable<string> {
    const url = this.endpoint + '/welcome';
    console.log(`calling ${url}`);

    return this.http.get<string>(url, headerOptions);
  }

}
