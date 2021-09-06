import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RequestTicket } from '../model/request-ticket';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private router: Router) { }

  create(resource: string, body: any) {
    let options = { headers: new HttpHeaders( { 'Content-Type': 'application/json'})};
    return this.http.post<any>(`${environment.apiUrl}/${resource}/create`, JSON.stringify(body), options)
      .pipe(map(res => res), catchError(this.handleError));
  }

  findAll(resource: string) {
    return this.http.get<RequestTicket[]>(`${environment.apiUrl}/${resource}/retrieve/all/30`)
      .pipe(map(res => res), catchError(this.handleError));

  }


  /*refresh() {
    let refreshToken = localStorage.getItem('refresh_token') || '';
    return this.http.get(`${environment.apiUrl}/security/refresh/token`, {headers: { 'Authorization': 'Bearer ' +
      refreshToken}}).pipe(map(res => {
        if(localStorage.getItem('access_token'))
          localStorage.removeItem('access_token')
        
        localStorage.setItem('access_token', Object.values(res)[0])
      }, catchError(err => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.router.navigate(['/login']);
        return throwError(err)})))
  }*/

  private handleError(error: any): Observable<void> {
   return throwError(error);

  }
}
