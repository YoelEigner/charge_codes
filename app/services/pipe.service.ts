import { Injectable } from '@angular/core';
import {Pipe,PipeTransform} from '@angular/core';


@Pipe({
  name: 'placeHolder'
})
@Injectable({
  providedIn: 'root'
})
export class PipeService implements PipeTransform{

  constructor() { }

  public transform(value: string, placeHolder?: string): string {
    return (value) ? value : (placeHolder !== undefined ? placeHolder : '-');
  }
}
