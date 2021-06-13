import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {User} from "../user";
import {Program} from "../program";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ProgramCodeService {
  constructor(private httpClient: HttpClient) {
  }

  getProgramData(programName: string, country_list: string): Observable<Program[]> {
    return this.httpClient.get<Program[]>(`${environment.API_URL}` + 'api/program/?country=' + country_list + '&program=' + programName);
  }
}
