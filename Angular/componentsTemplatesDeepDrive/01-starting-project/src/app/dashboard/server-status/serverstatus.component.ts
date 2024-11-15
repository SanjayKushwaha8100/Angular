import { Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-serverstatus',
  standalone: true,
  imports: [],
  templateUrl: './serverstatus.component.html',
  styleUrl: './serverstatus.component.css',
})
export class ServerstatusComponent implements OnInit, OnDestroy {
  private destroyRef = inject(DestroyRef);  // in angular 16 or greater same like ngOnDestroy
  private interval?: ReturnType<typeof setInterval>;
  // currentStatus: 'online' | 'offline' | 'unknown' = 'offline'; // check the type of currentStatus
  // above way is known as Literal Types
  currentStatus = signal<'online' | 'offline' | 'unknown' >('offline');
  constructor() {
    console.log(this.currentStatus());// angular is not subscribe to it
    effect(()=>{
      console.log(this.currentStatus()); // angular is subscribe to to so whenever the changes happens this will execute
    })
  }
  // instead of putting random no generator in constrctor we can use ngOnInit() search -> why should we use ngOnInit()  instead of constructor()
  //       The constructor is called when the component is created, before data-bound properties are initialized.
  //      ngOnInit() is called after Angular has initialized all data-bound properties of a component.

  ngOnInit() { // if we do typo in the method name it will not give any error anywhere because it is a method name but ngOnInit() is only provided by Angular so
              //  to over come it use 'implements OnInit to that class'
    // below method is provided by JS and pass 2nd argument for time in ms
    const interval16=this.interval=setInterval(() => { // return  NodeJS.Timeout or void
      const random = Math.random(); // 0 to 0.9999999
      if (random < 0.5) {
        // this.currentStatus = 'online';
        this.currentStatus.set("online"); // for signal
      } else if (random < 0.9) {
        // this.currentStatus = 'offline';
        this.currentStatus.set("offline"); 
      } else {
        // this.currentStatus = 'unknown';
        this.currentStatus.set("unknown");
      }
    }, 5000);
    // below method is to destroy this component
    this.destroyRef.onDestroy(()=>{ // this is Destroy listener
      clearInterval(interval16);
    });
  }
  ngOnDestroy() {
  
    clearInterval(this.interval);// inbuild method
  }

}
