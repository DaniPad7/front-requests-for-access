/**This will check if a token is present but let's see if we can make it do other stuff like check authorities that
 * are claims in the token
 */

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationServiceService } from "../services/authentication-service.service";
import { UserService } from "../services/user.service";

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        //const currentUser = this.userService.currentUserValue;/**hold up on this line */
        const isLoggedIn = !!localStorage.getItem('access_token');
        if(isLoggedIn) /*user is logged in if truthy*/
            return true;
        /*Not logged in so redirect to main page*/
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
    
}