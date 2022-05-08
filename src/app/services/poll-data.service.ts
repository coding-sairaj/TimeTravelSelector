import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, of, timestamp } from 'rxjs';
import { View } from "../models/view";

@Injectable({
  providedIn: 'root'
})
export class PollDataService {
  max : number = 100000;
  min : number = 1000;
  constructor() { }
  poll() : Observable<View[]>
  {
    let arrayLen : Number = Math.floor(Math.random() * (1001));
    let views : View[] = [...new Array(arrayLen)].map(
      () => {
        let v : View = {
          value: this.generateRandomNumber(),
          timestamp: new Date()
        };
        return v;
      }
    );
    return of(views);
  }

  generateRandomNumber() : Number
  {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }
}
