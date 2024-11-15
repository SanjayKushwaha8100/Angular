import { AfterContentInit, afterNextRender, afterRender, Component, ContentChild, ElementRef, HostBinding, HostListener, inject, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation:ViewEncapsulation.None,  // by choosing None we want shadow DOM not to work so that css will become global
  host:{
    class:"control", // applying class properties to the host(app-control)
    '(click)' : 'onClick()' // use this way(preferred) or use @HostListener('click')  onClick(){} in the class
  } 
  // or u can use @HostBinding() instead of above  and this one is the preferred way
})
export class ControlComponent implements AfterContentInit {
  @Input() label!:string;
  private el = inject(ElementRef);// give access to the host elem
  @ContentChild('input') private control?:ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  // input is not in this template it is in new-ticket.component.html(child) after this we got the refrece 

  ngAfterContentInit(){
    console.log("After Content Init- control.component");
    console.log(this.control);
  }
  constructor(){
    afterRender(()=>{
      console.log("After Render");// if any change happens in the website this will execute it ;
    })
    afterNextRender(()=>{
      console.log("After Next Render");//execute after any next change occure in the entire application
    })
  }
  @HostBinding('class') className='control';  // bindin it className variable to ('class')
  onClick(){
    console.log("clicked through host properties 'click' event listening")
    console.log("Will print the host element :",this.el);
    console.log(this.control);
  }

}
