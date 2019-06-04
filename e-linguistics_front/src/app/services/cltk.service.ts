import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

const headerOptions = {
    headers : new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
};

@Injectable()
export class CltkService {
    private endpoint = environment.API_ENDPOINT + '/cltk/';

    constructor(private http: HttpClient) { }

    lemmatizeText(input_text: string): Observable<string[]> {
        const url = this.endpoint + 'lemmatize';

        return this.http.post<string[]>(url, {'input_text': input_text}, headerOptions);
    }

}
