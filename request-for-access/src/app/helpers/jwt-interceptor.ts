import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { AuthenticationServiceService } from "../services/authentication-service.service";
import { environment } from "src/environments/environment";
import { UserService } from "../services/user.service";
import { catchError, map, switchMap } from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthenticationServiceService){}
    /**We intercept the request here and add the Authorization if user is logged in */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let accessToken = localStorage.getItem('access_token') || '';
        
        //const currentUser = this.userService.currentUserValue;/**hold up on this line */
        const isLoggedIn = !!accessToken; /**This might change because our user won't
        have a token property for sure */
        const isApiUrl = req.url.startsWith(environment.apiUrl);

        if(isLoggedIn && isApiUrl)
            req = this.addTokenHeader(req, accessToken);

        return next.handle(req).pipe(catchError(err => {
            if(err.status === 403)
                this.authService.logout();
                
            return throwError(err);
        }));
    }

    private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
        let accessToken = localStorage.getItem('access_token') || '';
        let refreshToken = localStorage.getItem('refresh_token') || '';
        /*return this.authService.refreshToken(refreshToken)
            .pipe(map(res => {
                if(accessToken)
                    localStorage.removeItem('access_token');
                if(refreshToken)
                    localStorage.removeItem('refresh_token');
                let keys = Object.keys(res);
                let index = 0;
                Object.values(res)
                .forEach(token => {
                    console.log(`Here are the tokens: ${token}`);
                    localStorage.setItem(keys[index], token);
                    ++index;
                });
                return next.handle(this.addTokenHeader(request, localStorage.getItem('access_token') || ''));
                          
            }), catchError(err => {
                    this.authService.logout();
                    return throwError(err);
                })
            );*/
            
        
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({ setHeaders: { Authorization: `Bearer ${token}`}});

    }

}