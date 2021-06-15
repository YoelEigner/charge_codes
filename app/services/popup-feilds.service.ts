import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PopupFields} from "../popupFeilds";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class PopupFeildsService {

  constructor(private httpClient: HttpClient) {
  }
  getFeilds(selectedCountry: any, searchString: any, optionalStr: any): Observable<PopupFields[]> {
    return this.httpClient.get<PopupFields[]>(`${environment.API_URL}`+ 'api/all/?country=' + selectedCountry + '&str=' + searchString + '&strBA=' + optionalStr);
  }

  getRMSandGreen(selectedCountry: any, searchString: any): Observable<PopupFields[]> {
    return this.httpClient.get<PopupFields[]>(`${environment.API_URL}`+ 'api/all/?country=' + selectedCountry + '&str=' + searchString);
  }
}
