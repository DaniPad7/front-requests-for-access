import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concat, Subscription } from 'rxjs';
import { JustificationOption } from 'src/app/model/justification-option';
import { RequestTicket } from 'src/app/model/request-ticket';
import { Role } from 'src/app/model/role';
import { StatusOption } from 'src/app/model/status-option';
import { User } from 'src/app/model/user';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit, OnDestroy{
  ticketForm!: FormGroup;
  user!: User;
  empty: User = this.userService.empty;
  subscription!: Subscription;

  constructor(private formBuilder: FormBuilder, private ticketService: TicketService,
    private userService: UserService, private router: Router) { 
    console.log('Reached create ticket constructor');
  }


  ngOnInit(): void {
    this.userService.currentUserValue;
    this.subscription = this.userService.currentUser.subscribe(user => this.user = user || this.empty);
    this.ticketForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      contactNumber: [''],
      emailId: [''],
      address: [''],
      privileges: ['', Validators.required],
      businessJustification: ['', Validators.required]
    });
  }

ngOnDestroy(): void {
 this.subscription.unsubscribe();
}

onSubmit() {
  if(this.ticketForm.invalid) {
    console.log('We got invalid in submit' + 'Here is user', this.user);
    console.log('Here is the ticketform:',this.ticketForm.value);
    return;
  }
    /**We have to send in the entire AppUser Object or the backend can't parse */
    console.log('Here is the ticketform:',this.ticketForm.value);
    let ticketGroup = this.ticketForm.controls;
    let justificationOption: JustificationOption;
    let statusOption: StatusOption = { statusId: 1, status: 'PENDING'};
    let role: Role;

  switch(Number(ticketGroup.businessJustification.value)) {
    case 1: justificationOption = { justificationId: 1, justification: 'Promotion' };
      break;
    case 2: justificationOption = { justificationId: 2, justification: 'Security Clearance' };
      break;
    case 3: justificationOption = { justificationId: 3, justification: 'Other' };
      break;
    default: console.log('Business Justification is invalid')
     return;
  }
  switch(Number(ticketGroup.privileges.value)) {
    case 2: role = { roleId: 2, role: 'ROLE_ADMIN'};
      break;
    case 3: role = { roleId: 3, role: 'ROLE_EXECUTIVE' };
      break;
    default: console.log('Privileges is invalid')
     return;
  }
  
  let ticket: RequestTicket = { appUserId: this.user,
    businessJustification: justificationOption, date: new Date(), statusOption: statusOption, ticketId: 0,
    privileges: role};
  this.ticketService.create('ticket', ticket)
    .subscribe(success => {
      console.log(success);
      this.router.navigate(['/'])}, err => console.log(err));
}

}
