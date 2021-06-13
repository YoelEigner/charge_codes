import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserService} from "./services/charge-codes.service";
import {getDataComponent} from "./charge-codes/charge-codes/charge-codes.component";

const routes: Routes = [
  {path: '', component: getDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

