import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { UserRegistrationService } from "./user-service/user-registration.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private userRegistrationService: UserRegistrationService,
        private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot) {
        if (localStorage.getItem('IsUserAdmin') === "true") {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}