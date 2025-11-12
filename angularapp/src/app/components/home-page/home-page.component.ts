import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userRole: string | null = null;
  
    constructor(private readonly authService: AuthService) {}
  
    ngOnInit(): void {
      this.userRole = this.authService.getAuthenticatedRole();
    }

}
