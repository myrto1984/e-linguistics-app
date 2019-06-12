import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {FindResults} from "../domain/collections-models";

const headerOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
};

@Injectable()
export class NltkService {
  private endpoint = environment.API_ENDPOINT + '/nltk/';

  constructor(private http: HttpClient) {
  }

  tokenizeText(input_text: string): Observable<string[]> {
    const url = this.endpoint + 'tokenize';

    return this.http.post<string[]>(url, input_text, headerOptions);
  }

  find(word: string, language: string): Observable<FindResults[]> {
    const url = this.endpoint + `find/${language}/synsets`;

    return this.http.post<FindResults[]>(url, {'search_word': word}, headerOptions);
  }

}
