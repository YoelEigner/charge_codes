import {UserService} from "../../services/charge-codes.service";
import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CountyListService} from "../../services/county-list.service";
import {ProgramCodeService} from "../../services/program-code.service";
import {PopupFeildsService} from "../../services/popup-feilds.service";
import {PipeService} from "../../services/pipe.service";
import {HttpClient} from "@angular/common/http";
import {global} from "../../globalConstants";
import {fillPopupDataService} from "../../services/fillPopupData.service";
import {clearUserBoxService} from "../../services/clearUserBox.service";


@Component({
  selector: 'app-test',
  templateUrl: './charge-codes.component.html',
  styleUrls: ['./charge-codes.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [PipeService, global, fillPopupDataService]
})

export class getDataComponent implements OnInit {
  get gv() {
    return global
  }
  public clearUserBox: clearUserBoxService;
  private fillPopupDataService: fillPopupDataService;
  private countryList: any;
  private programData: any;
  private popupFields: any;
  private pipService: any;

  constructor(private httpClient: HttpClient,public  userService: UserService,
              capitalize: PipeService,
              countryList: CountyListService,
              programData: ProgramCodeService,
              popupFields: PopupFeildsService,
              fillPopupDataService: fillPopupDataService,
              clearUserBox: clearUserBoxService,
              private ModalService: NgbModal,
  ) {
    this.countryList = countryList;
    this.programData = programData;
    this.popupFields = popupFields;
    this.pipService = PipeService;
    this.fillPopupDataService = fillPopupDataService;
    this.clearUserBox = clearUserBox;
  }

  ngOnInit(): void {
    this.gv.showSpinner = false
    this.gv.validationError = false;
    this.gv.validationErrorNoUser = false;
    this.gv.userTable = true;
    this.gv.programTable = false;
    this.gv.placeHolder = 'Name/NTID';
    this.gv.radioButton = 'user';
    this.gv.select = 'Select your country';
    this.getCountyData();
  }
  //open popup form
  openXl(content: any) {
    this.ModalService.open(content, { size: 'xl', keyboard: true });
  }


  //user search button
  userClick() {
    this.gv.showSpinner = true;
    this.gv.overlay = true;
    this.gv.validationError = false;
    this.gv.validationErrorNoUser = false;
    this.countryList.countySelection();

    if (this.gv.selected === false) {
      return;
    }
    if (this.gv.selected === true) {
      this.checkUserBox();
      if (this.gv.radioButton === 'user'){
        this.gv.programTable = false;
        this.gv.userTable = true;
        this.getUserData();
      }
      if (this.gv.radioButton === 'program'){
        this.gv.programTable = true;
        this.gv.userTable = false;
        this.getProgramData();
      }
      if (this.gv.userID === ' '){
        this.gv.userID = '';
      }
    }
  }


  //subscribing to get program data
  getProgramData() {
    this.programData.getProgramData(this.gv.userID, this.gv.select).map((data: any) => data)
      .subscribe(
        (data: any) => {
          this.gv.PROGRAM = data.recordset;
        },
        (err: any) => console.log(err), // error
        () =>   this.fillItems()
      );
  }
  //subscribing to get user data
  getUserData() {
    this.userService.getUsers(this.gv.userID, this.gv.select).map((data: any) => data)
      .subscribe(
        (data: any) => {
          this.gv.USERS = data.recordset;
        },
        err => console.log(err), // error
        () =>  this.fillItems()
      );
  }

  //get and fill country dropdown list
  getCountyData(){
    this.countryList.getCountries().subscribe((res: any) => {
      this.gv.countries = res.recordset;
    });
  }
  //get data and fill popup form
  getPopupData() {
    // @ts-ignore
    for (let i = 0; i < this.gv.USERS.length; i++) {
      //RMS
      if (this.gv.USERS[i].description.includes('RMS')) {
        this.gv.rms = true;
      }
      //Greenville
      else if (this.gv.USERS[i].description.includes('Greenville')) {
        this.gv.greenville = true;
      }
      //RMS & Greenville
      else if (this.gv.rms === true && this.gv.greenville === true) {
        this.gv.allRG = true;
        this.fillPopupDataService.fillPopupData();
        return;
      }
    }
    this.fillPopupDataService.fillPopupData();
  }

  //create email link on the HTML page
  mailto() {
    return "mailto:jack.j.symes@lmco.com?Subject=Charge Code"
  }
  //add empty space to user box if empty to search all records
  checkUserBox(){
    if (this.gv.userID === undefined || this.gv.userID === ''){
      this.gv.userID = ' ';
    }
  }

  //fill data tables after data is received from subscription
  fillItems(){
    try {
      let str = this.gv.userID;
      if (this.gv.radioButton === 'user' && this.gv.USERS.length >= 1){
        this.gv.userID = this.gv.USERS[0].DISPLAYNAME;
        this.getPopupData()
        this.gv.overlay = false;
        this.gv.showSpinner = false;
      }
      if (this.gv.radioButton === 'program'  && this.gv.PROGRAM.length >= 1) {
        this.gv.userID = str.charAt(0).toUpperCase() + str.slice(1);
        this.gv.overlay = false;
        this.gv.showSpinner = false;
      }
      else {
        if (this.gv.radioButton === 'user' && this.gv.USERS.length < 1){
          this.gv.UserNA = 'User not found! For more information please email'
          this.gv.validationErrorNoUser = true;
          this.clearUserBox.clearUserBox();
        }
        if (this.gv.radioButton === 'program' && this.gv.PROGRAM.length < 1){
          this.gv.UserNA = 'Program not found! For more information please email'
          this.gv.validationErrorNoUser = true;
          this.clearUserBox.clearUserBox();
        }
      }
    }catch {
    }
    finally {
    }
  }
}

