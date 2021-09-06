import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http: HttpClient, private userService: UserService, private router : Router) { }

  login(username: string, password: string) {
    let form = new FormData();
    form.append('username', username);
    form.append('password', password);
    return this.http.post(`${environment.apiUrl}/login`, form)
      .pipe(map(res => {
        let keys = Object.keys(res);
        let index = 0;
        Object.values(res)
        .forEach(token => {
          console.log(`Here are the tokens: ${token}`);
          localStorage.setItem(keys[index], token);
          ++index;
        });
      }
        ));
  }

  logout() {
    let emptyUser:User = {
      appUserId: 0,
      address: '',
      contactNumber: '',
      emailId: '',
      firstName: '',
      lastName: ''
    };
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.userService.changeUser(emptyUser);
    this.router.navigate(['/login']);
  }

  /*refreshToken(token: string) {
    const tokenObject = {refreshToken: token};
    return this.http.post(`${environment.apiUrl}/security/refresh/token`, 
    JSON.stringify(tokenObject));
  }*/
}
