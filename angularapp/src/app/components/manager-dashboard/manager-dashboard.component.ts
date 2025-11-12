import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';
 
@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
 
export class ManagerDashboardComponent implements OnInit {
 
 
  happyClientsCount: number = 0;
  unhappyClientsCount: number = 0;
  tickets: Ticket[] = [];
 
  userRole: string = '';

  constructor(private readonly ticketService:TicketService) {}
 
  ngOnInit(): void {
 
    this.userRole = localStorage.getItem('role') || '';

    this.ticketService.getAllTickets().subscribe({
 
      next: (data: Ticket[]) => {
 
        this.tickets = data;
        this.calculateClientSatisfaction();
 
      },
      error: (err) => {
 
        console.error('Error fetching tickets:', err);
 
      }
    });
  }
 
  calculateClientSatisfaction(): void {
 
    this.happyClientsCount = this.tickets.filter(t => t.satisfied === true).length;
    this.unhappyClientsCount = this.tickets.filter(t => t.satisfied === false).length;
 
  }
}
 
 