import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../components/auth/auth.service';


@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private authServices: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isLoggin = this.authServices.isLogin();
        if (isLoggin) {
          this.router.navigate(['/contactos'], { queryParams: { returnUrl: state.url }});
          return false;
        }

        return true;
    }
}