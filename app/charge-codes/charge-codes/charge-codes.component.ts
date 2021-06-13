import {UserService} from "../../services/charge-codes.service";
import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {User} from "../../user";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CountyListService} from "../../services/county-list.service";
import {Countries} from "../../countries";
import {ProgramCodeService} from "../../services/program-code.service";
import {Program} from "../../program";
import {PopupFeildsService} from "../../services/popup-feilds.service";
import {PopupFeilds} from "../../popup-feilds";
import {PipeService} from "../../services/pipe.service";
import {Observable, Subscription} from "rxjs";
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-test',
  templateUrl: './charge-codes.component.html',
  styleUrls: ['./charge-codes.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [PipeService]
})


export class getDataComponent implements OnInit {
  popupHeader: any;
  selected: any;
  USERS: User[] = [];
  radioButton = 'user';
  userID: any;
  select: any;
  validationErrorNoUser = false;
  validationError = false;
  placeHolder: any;
  userTable: any;
  programTable = false;
  overlay = false;

  rmsSTR = 'RMS_INTL_Common_Support___Indirect (overhead) Personal Mobility charges (iphone equip and recurring service)';
  greenvilleStr = 'Greenville___Hardware';


  PROGRAM: Program[] = [];
  countries: Countries[] = [];
  POPUP: PopupFeilds[] = [];
  rms: any;
  greenville: any;
  allRG: any;
  RMSStr: any;
  UserNA: any;
  showSpinner = false

  private countryList: any;
  private programData: any;
  private popupFeilds: any;
  private pipService: any;

  constructor(private httpClient: HttpClient,public  userService: UserService,
              capitalize: PipeService,
              countryList: CountyListService,
              programData: ProgramCodeService,
              popupFeilds: PopupFeildsService,
              private ModalService: NgbModal,
              ) {
    this.countryList = countryList;
    this.programData = programData;
    this.popupFeilds = popupFeilds;
    this.pipService = PipeService;
  }
  ngOnInit(): void {
    this.showSpinner =false
    // this.OverlayService.removeOverly('overlay')
    this.validationError = false;
    this.validationErrorNoUser = false;
    this.userTable = true;
    this.programTable = false;
    this.placeHolder = 'Name/NTID';
    this.radioButton = 'user';
    this.select = 'Select your country';
    this.getCountyData();

  }
  //open popup form
  openXl(content: any) {
    this.ModalService.open(content, { size: 'xl', keyboard: true });
  }
  //user search button
  userClick() {
    this.showSpinner = true;
    this.overlay = true;
    this.validationError = false;
    this.validationErrorNoUser = false;
    this.countySelection();

    if (this.selected == false) {
      return;
    }
    if (this.selected == true) {
      this.checkUserBox();
      if (this.radioButton == 'user'){
        this.programTable = false;
        this.userTable = true;
        this.getUserData();
      }
      if (this.radioButton == 'program'){
        this.programTable = true;
        this.userTable = false;
        this.getProgramData();
      }
      // setTimeout(this.fillUserBox, 5000);
      if (this.userID == ' '){
        this.userID = '';
      }
    }

  }
  //fill data tables after data is received from subscription
  fillItems(){
    try {
      let str = this.userID;
      if (this.radioButton == 'user' && this.USERS.length >= 1){
        this.userID = this.USERS[0].DISPLAYNAME;
        this.getPupupData()
        this.overlay = false;
        this.showSpinner = false;
      }
      if (this.radioButton == 'program'  && this.PROGRAM.length >= 1) {
        this.userID = str.charAt(0).toUpperCase() + str.slice(1);
        this.overlay = false;
        this.showSpinner = false;
      }
      else {
        if (this.radioButton == 'user' && this.USERS.length < 1){
          this.UserNA = 'User not found! For more information please email'
          this.validationErrorNoUser = true;
          this.clearUserBox();
        }
        if (this.radioButton == 'program' && this.PROGRAM.length < 1){
          this.UserNA = 'Program not found! For more information please email'
          this.validationErrorNoUser = true;
          this.clearUserBox();
        }
      }
    }catch {
    }
    finally {
    }
  }

  //clear user input box
  clearUserBox(){
    if (this.radioButton == 'user'){
      this.userID = '';
      this.placeHolder = 'Name/NTID';
      this.select = 'Select your country';
    }
    if (this.radioButton == 'program'){
      this.userID = '';
      this.placeHolder = 'Program Name';
      this.select = 'Select your country';
    }
    this.showSpinner = false;
    this.overlay = false;
  }

  //subscribing to get program data
  getProgramData() {
    this.programData.getProgramData(this.userID, this.select).map((data: any) => data)
      .subscribe(
        (data: any) => {
          this.PROGRAM = data.recordset;
        },
        (err: any) => console.log(err), // error
        () =>   this.fillItems()
      );
  }



  //subscribing to get user data
  getUserData() {
    this.userService.getUsers(this.userID, this.select).map((data: any) => data)
      .subscribe(
        (data: any) => {
          this.USERS = data.recordset;
        },
        err => console.log(err), // error
        () =>   this.fillItems()
      );
  }
  //subscribes to get popup data
  fillpopupData(){
    //All
    if (this.allRG == true) {
      this.popupFeilds.getFeilds(this.select, this.rmsSTR, this.greenvilleStr).subscribe((res: any) => {
        this.POPUP = res.recordset;
      })
      this.RMSStr = 'For RMS mobility and Greenville Hardware charge code please click here';
      this.popupHeader = 'RMS mobility and Greenville hardware charge codes';
      this.validationErrorNoUser = false;
      this.validationError = true;
      this.allRG = false;
      this.rms = false;
      this.greenville = false;
      return;
    }
    //RMS
    else if (this.rms == true) {
        this.popupFeilds.getRMSandGreen(this.select, this.rmsSTR).subscribe((res: any) => {
          this.POPUP = res.recordset;
        })

      this.RMSStr = 'For RMS mobility charge code please click here ';
      this.popupHeader = 'RMS mobility charge codes';
      this.validationErrorNoUser = false;
      this.validationError = true;
      this.rms = false;
    }
    //Greenville
    if (this.greenville == true){
      this.popupFeilds.getRMSandGreen(this.select, this.greenvilleStr).subscribe((res: any) => {
        this.POPUP = res.recordset;
      })
      this.RMSStr = 'For Greenville hardware charge code please click here';
      this.popupHeader = 'Greenville hardware charge codes';
      this.validationErrorNoUser = false;
      this.validationError = true;
      this.greenville = false;
    }
  }
  //get and fill country dropdown list
  getCountyData(){
    this.countryList.getCountries().subscribe((res: any) => {
      this.countries = res.recordset;
    });
  }
  //get data and fill popup form
  getPupupData() {
    // @ts-ignore
    for (let i = 0; i < this.USERS.length; i++) {
      //RMS
      if (this.USERS[i].description.includes('RMS')) {
        this.rms = true;
      }
      //Greenville
      else if (this.USERS[i].description.includes('Greenville')) {
        this.greenville = true;
      }
      //RMS & Greenville
      else if (this.rms == true && this.greenville == true) {
        this.allRG = true;
        this.fillpopupData();
        return;
      }
    }
    this.fillpopupData();
  }

  //create email link on the HTML page
  mailto() {
    return "mailto:jack.j.symes@lmco.com?Subject=Charge Code"
  }
  //add empty space to user box if empty to search all records
  checkUserBox(){
    if (this.userID == undefined || this.userID == ''){
      this.userID = ' ';
    }
  }

  //ensure that a country selection was made
  countySelection(){
    if (this.select == 'Select your country'){
      alert("Please select a country")
      this.selected = false;
      this.showSpinner = false;
      this.overlay = false;
      this.USERS = [];
      this.PROGRAM = [];

      if (this.radioButton == 'program'){
        this.userID = '';
        this.placeHolder = 'Program Name';
      }
      if (this.radioButton == 'user'){
        this.userID = '';
        this.placeHolder = 'Name/NTID';
      }
    }
    else {
      this.selected = true;
    }
  }
}

