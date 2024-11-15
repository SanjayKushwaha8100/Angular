import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { type UserType } from './user.model';
import { CardComponent } from "../shared/card/card.component";
// import { DUMMY_USERS } from '../dummy-users';

// const randomIndex = Math.floor(Math.random()*DUMMY_USERS.length);
// const a= Math.floor(Math.random());


    // defining a type and a interface so thata we can directly use it like a objects

interface UserInterface {
  id:string;
  avatar:string;
  name:string;
}
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {


    // by using signals 
  // selectedUser = signal(DUMMY_USERS[randomIndex]);
  // imagePath = computed(()=>'assets/users/' + this.selectedUser().avatar);

  // get imagePath(){
  //   return 'assets/users/' + this.selectedUser.avatar;
  // }

  // this is a decorater 
  // by using ! we are promising the Angular that we will initiliaze it before using it 
  // and if we use required = true then it become compulsory to use it 
  // @Input({required : true}) avatar!:string;
  // @Input() name!:string;

  @Input({required:true}) selected!:boolean;

  // accepting input in a Signals
  //avatar = input.required<string>();  // is same as @Input({required : true}) avatar!:string;
  //name = input.required<string>();  
  // signal can take any value non signals also see app.html it is properties binding for avater and taking user array values

  // whenever you use signal you have to use computed()
    // imagePath = computed(()=>{
    //   return 'assets/users/' + this.avatar();
    // })

   // this way is a general way of doing things
  get imagePath(){
    return 'assets/users/' + this.user.avatar;
  }

  // now Outputing  by creating a object of EventEmitter 
  // @Input({required:true}) id!:string; // this is a signal
  // @Input({required : true}) avatar!:string;
  // @Input() name!:string;
  // @Output() select = new EventEmitter<string>();   // this doesn't create signal
  // same like above but using output function
  select = output<string>();

  // now taking values in a object and where even you want this value use user.
  // @Input({required:true}) user!:{
  //   id:string;
  //   avatar:string;
  //   name:string;
  // }

  // or by using type & interface
  @Input({required:true}) user!:UserType;
  // @Input({required:true}) user!:UserType;
  




  onSelectUser() {
    // const randomIndex = Math.floor(Math.random()*DUMMY_USERS.length);
    // this.selectedUser=DUMMY_USERS[randomIndex];  // now below line is using signals
    // this.selectedUser.set(DUMMY_USERS[randomIndex]);

    // in above code being as signals you can set the value 
    // but in below code you can't as for input it can only read the value 

    // this.avatar.set()

    // emitting 
    this.select.emit(this.user.id);

  }

}


