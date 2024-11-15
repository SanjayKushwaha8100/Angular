import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customTemp',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: number | string,
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah'
  ) {
    let val: number;
    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }
    let output: number;
    if (inputType === 'cel' && outputType === 'fah') {
      output = ((val - 32) * 9) / 5;
    } else if (inputType === 'fah' && outputType == 'cel') {
      output = val * (9 / 5) + 32;
    }else{
        output= val;
    }

    let symbol:string;
    if(!outputType){
        symbol = inputType === 'cel' ? '°C' : '°F';
    }else{
        symbol = outputType === 'cel' ? '°C' : '°F';
    }
    return `${output.toFixed(2)}${symbol}`; // toFixed-> Number of digits after the decimal point. range 0 - 20, inclusive.
  }
}
