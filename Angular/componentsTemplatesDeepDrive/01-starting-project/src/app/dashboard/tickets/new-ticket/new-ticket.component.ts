import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit{  
  @Output() add = new EventEmitter<{title:string,text:string}>();
  // for above line now we are using two-way binding  
  enteredText='';
  enteredTitle='';

  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  // we are decorating the form properties by ViewChild, is used to select element from template of this component
  // and make them available in this component class
  // viewChild is a decorator help us to find child elements in that component'view so in that component's template
  // To do that, ViewChild needs a selector as an argument and that selector can be a string
  // But it could also be the class name of one of your Components like ButtonComponent 
  // If you would use such a class name,then ViewChild would look for an instance of your ButtonComponent in this template,
  // and here it would find one,and it would then store that instance in that form property here.So then you could interact
  // with that ButtonComponent instance via that property in this component class.
  // you can't pass CSS selector 
  // you can use viewChilder for multiple component. Can use viewChild() function but avail in Angular 17.3

  // private form1 = viewChild.required<ElementRef<HTMLFormElement>>('form');

  ngOnInit(){
    console.log("ONINIT");
    console.log(this.form?.nativeElement);
        // in console you will not get the value of form because it is executing at initiliaze and this is child properties
  }
  ngAfterViewInit() {
    console.log("AFTER VIEW INIT");
    console.log(this.form?.nativeElement);
    // in console you will get the value of form because it is executing after view initiliaze 
  }


  onSubmit() {
    // console.dir(titleElement);
    // dir -> to console the DOM object  and this titleElement is a object 
    //console.log(titleElement.value);  // to get the value of HTMLInputElement type element
    //console.log(text);
    // form.reset();// to reset the form // form:HTMLFormElement this has to be in argument to use this line 

    
    // this.form1().nativeElement.reset(); // for funtion
    // this.add.emit({title:titleElement,text:text});
    this.add.emit({title:this.enteredTitle,text:this.enteredText});
    // after using two-way binding you can again assign the empty string to the above variable 
    // then no need to reset the form 
    
    this.form?.nativeElement.reset();
  }
}
