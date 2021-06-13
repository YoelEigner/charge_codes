import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import 'rxjs'
import {Countries} from "../countries";
import {environment} from "../../environments/environment.prod";
import {GlobalConstants} from "../GlobalConstants";

@Injectable({
  providedIn: 'root'
})
export class CountyListService {
  Constants = GlobalConstants;

  constructor(private httpClient: HttpClient) {
  }

  getCountries(): Observable<Countries[]> {
    return this.httpClient.get<Countries[]>(`${environment.API_URL}` + 'api/countylist');
  }

  //ensure that a country selection was made
  countySelection(select: any){
    if (select == 'Select your country'){
      alert("Please select a country")
      this.Constants.selected = false;
      this.Constants.showSpinner = false;
      this.Constants.overlay = false;
      this.Constants.USERS = [];
      this.Constants.PROGRAM = [];

      if (this.Constants.radioButton == 'program'){
        this.Constants.userID = '';
        this.Constants.placeHolder = 'Program Name';
      }
      if (this.Constants.radioButton == 'user'){
        this.Constants.userID = '';
        this.Constants.placeHolder = 'Name/NTID';
      }
    }
    else {
      this.Constants.selected = true;
    }
  }

}
