import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) { }
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data['role'];
    const userRole = this.authService.getRole();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
 
    if (expectedRole && userRole !== expectedRole) {
      const errorObj = {
        status: "403 Forbidden",
        message: "You are not authorized to access this page!"
      };
      console.log(errorObj);
      return this.router.navigate(['/error'], { state: { error: errorObj } })
    }
 
    return true;
  }
 
}
 