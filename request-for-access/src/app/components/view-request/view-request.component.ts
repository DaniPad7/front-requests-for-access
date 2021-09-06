import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.userService.currentUserValue;
    this.subscription = this.userService.currentUser.subscribe(user => this.user = user);

    this.ticketService.findAll('ticket').subscribe(success => this.requestTickets = success || []);
  }

}
