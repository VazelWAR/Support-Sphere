import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    role: ''
  };
 
  showPopup: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = false;
 
  constructor(private readonly authService: AuthService, private readonly router: Router) {}
 
 
  register() {
    if (this.user.password !== this.user.confirmPassword) {
      this.popupMessage = 'Passwords do not match';
      this.isSuccess = false;
      this.showPopup = true;
      return;
    }
 
    const userFinal: User = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      mobileNumber: this.user.mobile,
      userRole: this.user.role
    };
 
    this.authService.register(userFinal).subscribe(
      () => {
        this.popupMessage = 'Registration successful!';
        this.isSuccess = true;
        this.showPopup = true;
 
        setTimeout(() => {
          this.showPopup = false;
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        console.error(error);
        this.popupMessage = 'Registration failed. Try again.';
        this.isSuccess = false;
        this.showPopup = true;
      }
    );
  }
 
  closePopup() {
    this.showPopup = false;
  }
}