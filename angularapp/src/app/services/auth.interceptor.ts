import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
 
@Injectable({
    providedIn: 'root'
})
 
export class AuthIntercepter implements HttpInterceptor {
 
    constructor(private readonly authService: AuthService) { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler) {
 
    let basicAuthHeaderString = this.authService.getAuthenticatedToken();
        let username = this.authService.getAuthenticatedUser();
        if (basicAuthHeaderString && username) {
            request = request.clone({
                setHeaders: {
                    Authorization: basicAuthHeaderString
                }
            })
        }
        return next.handle(request);
    }
}
 
 