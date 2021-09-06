import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**to reach components that utilize this service, a jwt must be in localStorage
   * let's try handling the errors in the components shall we and then wecan make new calls
   * from there
   */
  empty: User = {address:'', lastName:'',
  contactNumber:'', firstName:'', emailId:'', appUserId: 0};
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(this.empty);
  public currentUser: Observable<User> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    
  }

  public get currentUserValue(): User {
    if(!this.currentUserSubject.value.address) {
      let token = localStorage.getItem('access_token') || '';
      if(token) {
        let obj = jwtDecode<JwtPayload>(token);
        console.log(obj);
        this.http.get<User>(`${environment.apiUrl}/auth/user/${obj.sub}`)
          .pipe(first(), tap(res => console.log(res)), catchError(this.handleError))/**catch error here */
          .subscribe(dataStream => this.currentUserSubject.next(dataStream || this.empty));
      }
    }
    return this.currentUserSubject.value;
  }

  changeUser(user: User) {
    this.currentUserSubject.next(user);
  }

  

  private handleError(error: any): Observable<void> {
     return throwError(error);

  }
}
