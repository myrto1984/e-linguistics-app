import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

const headerOptions = {
    headers : new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
};

@Injectable()
export class NltkService {
    private endpoint = environment.API_ENDPOINT + '/nltk/';

    constructor(private http: HttpClient) { }

    tokenizeText(input_text): Observable<string[]> {
        const url = this.endpoint + 'tokenize';

        return this.http.post<string[]>(url, input_text, headerOptions);
    }


}
