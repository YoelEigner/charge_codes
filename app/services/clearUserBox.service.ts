import { Injectable } from '@angular/core';
import {global}  from "../globalConstants";

@Injectable({
  providedIn: 'root'
})
export class clearUserBoxService {
  // get gv() {
  //   return global
  // }
  constructor() { }

  //clear user input box
  clearUserBox(){
    if (global.radioButton === 'user'){
      global.userID = '';
      global.placeHolder = 'Name/NTID';
      global.select = 'Select your country';
    }
    if (global.radioButton === 'program'){
      global.userID = '';
      global.placeHolder = 'Program Name';
      global.select = 'Select your country';
    }
    global.showSpinner = false;
    global.overlay = false;
  }

}
