import {Injectable} from '@angular/core';
import {global} from "../globalConstants";
import {getDataComponent} from "../charge-codes/charge-codes/charge-codes.component";
import {clearUserBoxService} from "./clearUserBox.service";


@Injectable({
  providedIn: 'root',
})
export class FillDataTablesService {
  private clearUserBox: clearUserBoxService;

  get gv() {
    return global
  }
  constructor(private getDataComponent: getDataComponent, clearUserBox: clearUserBoxService) {
    this.clearUserBox = clearUserBox;
  }

}
