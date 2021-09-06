import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import jwtDecode from "jwt-decode";
import { Observable } from "rxjs";


@Injectable({providedIn: 'root'})
export class AuthorizationGuardAdminAndExecutive implements CanActivate {

    constructor(private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const token = localStorage.getItem('access_token') || '';
        let payload: any = jwtDecode(token);
        let roles: string[] = payload['roles'];
        if(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_EXECUTIVE'))
            return true;
        
        this.router.navigate(['/']);
        return false;
    }
}