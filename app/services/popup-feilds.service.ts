import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PopupFeilds} from "../popup-feilds";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class PopupFeildsService {

  constructor(private httpClient: HttpClient) {
  }
  getFeilds(selectedCountry: any, searchString: any, optionalStr: any): Observable<PopupFeilds[]> {
    return this.httpClient.get<PopupFeilds[]>(`${environment.API_URL}`+ 'api/all/?country=' + selectedCountry + '&str=' + searchString + '&strBA=' + optionalStr);
  }

  getRMSandGreen(selectedCountry: any, searchString: any): Observable<PopupFeilds[]> {
    return this.httpClient.get<PopupFeilds[]>(`${environment.API_URL}`+ 'api/all/?country=' + selectedCountry + '&str=' + searchString);
  }
}
