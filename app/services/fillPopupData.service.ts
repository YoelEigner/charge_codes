import { Injectable } from '@angular/core';
import {global} from "../globalConstants";
import {PopupFeildsService} from "./popup-feilds.service";

@Injectable({
  providedIn: 'root'
})
export class fillPopupDataService {
  get gv() {
    return global
  }
  constructor( private popupFields: PopupFeildsService ) {  }
  //subscribes to get popup data
  fillPopupData(){
    //All
    if (this.gv.allRG === true) {
      this.popupFields.getFeilds(this.gv.select, this.gv.rmsSTR, this.gv.greenvilleStr).subscribe((res: any) => {
        this.gv.POPUP = res.recordset;
      })
      this.gv.RMSStr = 'For RMS mobility and Greenville Hardware charge code please click here';
      this.gv.popupHeader = 'RMS mobility and Greenville hardware charge codes';
      this.gv.validationErrorNoUser = false;
      this.gv.validationError = true;
      this.gv.allRG = false;
      this.gv.rms = false;
      this.gv.greenville = false;
      return;
    }
    //RMS
    else if (this.gv.rms === true) {
      this.popupFields.getRMSandGreen(this.gv.select, this.gv.rmsSTR).subscribe((res: any) => {
        this.gv.POPUP = res.recordset;
      })

      this.gv.RMSStr = 'For RMS mobility charge code please click here ';
      this.gv.popupHeader = 'RMS mobility charge codes';
      this.gv.validationErrorNoUser = false;
      this.gv.validationError = true;
      this.gv.rms = false;
    }
    //Greenville
    if (this.gv.greenville === true){
      this.popupFields.getRMSandGreen(this.gv.select, this.gv.greenvilleStr).subscribe((res: any) => {
        this.gv.POPUP = res.recordset;
      })
      this.gv.RMSStr = 'For Greenville hardware charge code please click here';
      this.gv.popupHeader = 'Greenville hardware charge codes';
      this.gv.validationErrorNoUser = false;
      this.gv.validationError = true;
      this.gv.greenville = false;
    }
  }
}
