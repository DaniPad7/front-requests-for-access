import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RequestTicket } from 'src/app/model/request-ticket';
import { User } from 'src/app/model/user';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {
  user!: User;
  empty: User = this.userService.empty;
  subscription!: Subscription;
  requestTickets!: RequestTicket[];
  updateTicketForm!: FormGroup;

  constructor(private userService: UserService, private ticketService: TicketService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userService.currentUserValue;
    this.subscription = this.userService.currentUser.subscribe(user => this.user = user);
    this.updateTicketForm = this.formBuilder.group({
      status: ['', Validators.required]
    });

    this.ticketService.findAll('ticket').subscribe(success => this.requestTickets = success || []);
  }

  onUpdateTicket(ticket: RequestTicket) {
    let index = this.requestTickets.indexOf(ticket);
    let updatedTicket = ticket;
    updatedTicket.statusOption.statusId =
      this.updateTicketForm.controls.status.value;
    this.ticketService.put('role', updatedTicket).subscribe(
      success => {
        this.requestTickets[index] = success || updatedTicket;
            }, err => console.log(err)
    );
  }

}
