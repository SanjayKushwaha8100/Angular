import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment-results/investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  // @Output() calculate= new EventEmitter<InvestmentInput>();  // below is to use output() function instead of @Output decorator
  // calculate = output<InvestmentInput>();  // comminting because now using service class
  enteredInitialInvestment = signal('0');
  enteredAnnualInvestment = signal('0');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');
  // if you using ngModel for these value it will automaticaly accepts the signal value without any changes

  // constructor function to enable Investment service 
  constructor(private investmentService: InvestmentService){

  }
  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      // below is the syntex for conveting string to number 
      initialInvestment: +this.enteredInitialInvestment(),
      duration: + this.enteredDuration(),
      expectedReturn: +this.enteredExpectedReturn(),  // if we didn't use () it will emit signal only
      annualInvestment: +this.enteredAnnualInvestment() // added () to read the signal data
    });
    this.enteredInitialInvestment.set('0');
    this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredDuration.set('10');
  }

}
