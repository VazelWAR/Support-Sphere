import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{



  email: string;
  password: string;
 
  constructor(private readonly authService: AuthService, private readonly router: Router) { }
 
  login() {
  
    if (this.email && this.password) {

      this.authService.login(this.email, this.password).subscribe(
        response => {
          console.log(this.email);
          console.log(this.password);
          this.router.navigate(['/home']);
        },

        error => {
          // Handle error responses
          console.error('Login failed', error);

        }

      );

    }

  }

}
