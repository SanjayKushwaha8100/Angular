import { Component } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { Ticket } from './ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {

  tickets: Ticket[] = [];

  OnAdd(ticketData: { title: string; text: string }) {
    const objectTicket: Ticket = {
      title: ticketData.title,
      request: ticketData.text,
      id: Math.random().toString(),
      status: 'open',
    };
    this.tickets.push(objectTicket);
  }
  onCloseTicket(id:string){
    this.tickets = this.tickets.map((ticket)=>{
      if(ticket.id === id){
        return {...ticket,status:'close'};
        // This line of code is using the spread operator (...) to create a new object based on an existing ticket object,
        // with one property modified. Let's break it down:
        // ...ticket: This spreads all properties of the existing ticket object into the new object.
        // status: 'close': This adds or overrides the status property with the value 'close'.
      }
      return ticket;
    })

  }

}
