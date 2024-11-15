import { Component, input, Input, output, signal } from '@angular/core';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [NewTicketComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {

  // @Input({required:true}) data!:Ticket;
  data = input.required<Ticket>(); // for angular 16 and above  this is a signal and above one is decorative
  detailsVisible = signal(false);
  close = output({alias:'closeTicket'});

  onToggleDetails(){
    // this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update((wasVisible)=>!wasVisible);
  }
  OnMarkAsComplete() {
    this.close.emit();  
  }
}
