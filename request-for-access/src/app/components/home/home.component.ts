import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user!: User;
  empty: User = this.userService.empty;
  subscription!: Subscription;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUserValue;
    this.subscription = this.userService.currentUser.subscribe(user => this.user = user || this.empty);
  }

}
