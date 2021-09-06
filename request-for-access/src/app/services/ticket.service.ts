import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RequestTicket } from '../model/request-ticket';
import { User } from '../model/user';
import { AuthenticationServiceService } from './authentication-service.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends DataService{

  constructor(http: HttpClient, router: Router) {
    super(http, router);
   }

  
}
