import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() user!: User;
  /*empty: User = this.userService.empty;
  subscription!: Subscription;*/

  constructor(private userService: UserService, private authService: AuthenticationServiceService) { }
  

  ngOnInit(): void {
    /*this.userService.currentUserValue;
    this.subscription = this.userService.currentUser.subscribe(user => this.user = user || this.empty);*/
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
