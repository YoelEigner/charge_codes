import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import 'rxjs'
import {Countries} from "../countries";
import {environment} from "../../environments/environment.prod";
import {global} from "../globalConstants";

@Injectable({
  providedIn: 'root'
})
export class CountyListService {
  get gv() {
    return global
  }
  constructor(private httpClient: HttpClient) {
  }

  getCountries(): Observable<Countries[]> {
    return this.httpClient.get<Countries[]>(`${environment.API_URL}` + 'api/countryList');
  }

  //ensure that a country selection was made
  countySelection(){
    if (this.gv.select === 'Select your country'){
      alert("Please select a country")
      this.gv.selected = false;
      this.gv.showSpinner = false;
      this.gv.overlay = false;
      this.gv.USERS = [];
      this.gv.PROGRAM = [];

      if (this.gv.radioButton === 'program'){
        this.gv.userID = '';
        this.gv.placeHolder = 'Program Name';
      }
      if (this.gv.radioButton === 'user'){
        this.gv.userID = '';
        this.gv.placeHolder = 'Name/NTID';
      }
    }
    else {
      this.gv.selected = true;
    }
  }
}
