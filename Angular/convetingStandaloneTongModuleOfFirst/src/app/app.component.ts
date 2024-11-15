import { Component } from '@angular/core';

import { DUMMY_USERS } from './dummy-users';

@Component({
  selector: 'app-root',
  standalone: false, // or remove it so conveting it to module  and remove the imports array 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'first';
  users=DUMMY_USERS;
  selectedUserId?:string;

  get selectedUser(){
    return this.users.find((user)=>user.id === this.selectedUserId)!;  // adding ! to convince js that it will find the user
  }
  onSelectUser(id:string){
    this.selectedUserId=id;
  }

}
