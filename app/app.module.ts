import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {getDataComponent} from "./charge-codes/charge-codes/charge-codes.component";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from "@angular/core";
import {MatSortModule} from "@angular/material/sort";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import { MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PipeService} from "./services/pipe.service";
import {clearUserBoxService} from "./services/clearUserBox.service";


const appRoutes: Routes = [
  { path: 'charge-codes', component: getDataComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    getDataComponent,
    PipeService
  ],

  imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
      ReactiveFormsModule,
      MatProgressSpinnerModule,
      FormsModule,
      MatSortModule,
      MatTableModule,
      RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        ),
        FormsModule,
        NgbModule,
        BrowserAnimationsModule
    ],
  exports:[
    // global.countries
  ],
  providers: [clearUserBoxService, getDataComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

