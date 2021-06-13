import { Component } from '@angular/core';
import {Routes} from "@angular/router";
import {getDataComponent} from "./charge-codes/charge-codes/charge-codes.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ROCC';
  magnifying = 'assets/images/magnifying.png'
  lmLogo = 'assets/images/LM-Logo.png'



}
