import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, computed, EventEmitter, inject, Input, input, Output, signal } from '@angular/core';
import { InvestmentService } from './investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [NgIf,CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  // constructor(private investmentService : InvestmentService){
        // use this way or 
  // }

  // OR

  private investmentService = inject(InvestmentService);

  // get results(){
  //   return this.investmentService.resultsData;
  // }
  // OR
  results = computed(()=>this.investmentService.resultsData());
  // OR more precise
  // results = this.investmentService.resultsData.asReadonly(); // u can call asReadonly() on signal for read only

  // we are not using below code because we are using service

  // results = input<{   // this way is avail in angular 17 and above
  //   year: number,
  //   interest: number,
  //   valueEndOfYear: number,
  //   annualInvestment: number,
  //   totalInterest: number,
  //   totalAmountInvested: number,
  // }[]>()    // now it is a array

  // OR

  // @Input() results?:{
  //   year: number,
  //   interest: number,
  //   valueEndOfYear: number,
  //   annualInvestment: number,
  //   totalInterest: number,
  //   totalAmountInvested: number,
  // }[];



}
