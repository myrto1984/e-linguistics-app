import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Inscription} from "../domain/collections-models";

const headerOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
};

@Injectable()
export class DbInscriptionService {
  private endpoint = environment.API_ENDPOINT + '/db/inscription';

  constructor(private http: HttpClient) {
  }

  postInscription(inscription: Inscription) {
    return this.http.post<Inscription>(this.endpoint, inscription, headerOptions);
  }

}
