import { Component, OnInit } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAssociate: boolean = false;
  isAdmin: boolean = false;
  isExecutive: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    let token = localStorage.getItem('access_token') || '';
    let payload: any = jwtDecode(token);
    let roles: string[] = payload['roles'];
    console.log(roles);
    if(roles.includes('ROLE_EXECUTIVE')) {
      console.log('User is Executive-Admin-Associate');
        this.isAdmin = true;
        this.isExecutive = true;
        this.isAssociate = true;
    }
    else if(roles.includes('ROLE_ADMIN')){
      console.log('User is Admin-Associate');
        this.isAdmin = true;
        this.isAssociate = true;
    }
    else {
      console.log('User is Associate');
        this.isAssociate = true;
    }
  }

}
