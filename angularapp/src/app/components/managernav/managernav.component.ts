import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-managernav',
  templateUrl: './managernav.component.html',
  styleUrls: ['./managernav.component.css']
})
export class ManagernavComponent implements OnInit {
    showLogoutPopup = false;
    isLoggedin = false;
    userRole = '';
    email = '';
    userName = '';
  
    constructor(private readonly authService: AuthService, private readonly router: Router) {}
  
    ngOnInit(): void {
      this.isLoggedin = this.authService.isLoggedIn();
      this.userRole = localStorage.getItem('role') || '';
      this.userName = localStorage.getItem('userName') || '';
      this.email = localStorage.getItem('authenticatedUser') || '';
      console.log("isloggedin: "+this.isLoggedin)
      console.log("email: "+this.email)
      console.log("role: "+this.userRole)
    }
  
    logout(): void {
      this.authService.logout();
      this.isLoggedin = false;
      this.userRole = '';
      this.email = '';
      this.router.navigate(['/login']).then(()=>{
        window.location.reload();
      });
    }
  
}