import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import {User} from "../user";
import {throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {response} from "express";
import 'rxjs'
import {getDataComponent} from "../charge-codes/charge-codes/charge-codes.component";
import {environment} from "../../environments/environment.prod";


@Injectable({
  providedIn: 'root',
})
  export class UserService {

  constructor(private httpClient: HttpClient) {
  }
  getUsers(userID: string, country_list: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.API_URL}` + 'api/users/?country=' + country_list + '&usr=' + userID
    )
  }
}


