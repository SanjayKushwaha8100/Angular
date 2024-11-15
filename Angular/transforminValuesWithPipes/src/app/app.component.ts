import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TemperaturePipe } from './temperature.pipe';
import { SortPipe } from './sort.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [DecimalPipe, TemperaturePipe, SortPipe],
})
export class AppComponent {
  currentDate = new Date();
  currentTemperaturs = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 172.1209001,
    chicago: 65.0775238,
  };

  historicTemperatures = [
    25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
  ];
  constructor(){
    // we are doing this so index wise value should be there if we use pipe it will distored the index
    this.historicTemperatures.sort((a,b)=>a>b ? 1 : -1)
  }

  onReset(index: number) {
    // we are doing this because customPipe is not working because this array and customPipe are seeing the same
    // array address, all pipes will only renders if there is change in the value but here it is refering to the
    // same address so now we are changing the address

    // const temp = [...this.historicTemperatures];
    // temp[index]=18;
    // this.historicTemperatures = temp;

    // or

    //use Pure:false in @Pipe -> it will execute that pipe whenever anyone changes anything anywhere in the template
    this.historicTemperatures[index] = 18;
  }
}
