import { Component, OnInit } from '@angular/core';
 
import { Router } from '@angular/router';
 
import { Ticket } from 'src/app/models/ticket.model';
 
import { TicketService } from 'src/app/services/ticket.service';
 
@Component({
 
  selector: 'app-client-view-tickets',
 
  templateUrl: './client-view-tickets.component.html',
 
  styleUrls: ['./client-view-tickets.component.css']
 
})
 
export class ClientViewTicketsComponent implements OnInit {
 
  tickets: Ticket[] = [];
 
  filteredTickets: Ticket[] = [];
 
  categories: string[] = ['High', 'Low', 'Medium'];
 
  searchQuery = '';
 
  selectedPriority = '';
 
  editingTicket: Ticket | null = null;
 
  confirmationMessage = '';
 
  userRole: string = '';
 
  showPopup: boolean = false;
 
  popupMessage: string = '';
 
  confirmDelete: boolean = false;
 
  ticketToDelete: any = null;
 
  userId:number=null;
 
  constructor(private readonly ticketService: TicketService, private readonly rt: Router) { }
 
  ngOnInit(): void {
 
    this.userRole = localStorage.getItem('role') || '';
 
    this.userId=parseInt(localStorage.getItem('userId')) || 0;
 
    this.loadTickets();
 
  }
 
  loadTickets(): void {
 
    this.ticketService.getTicketsByUserId(this.userId).subscribe({
 
      next: (data) => {
 
        this.tickets = data;
 
        this.filteredTickets = data;
 
      },
 
      error: (err) => console.error('Error loading tickets:', err)
 
    });
 
  }
 
  filterTickets(): void {
 
    this.filteredTickets = this.tickets.filter(ticket =>
 
      ticket.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
 
      (this.selectedPriority === '' || ticket.priority === this.selectedPriority)
 
    );
 
  }
 
  editTicket(ticket: Ticket): void {
 
    this.rt.navigate(['/client-edit-ticket', ticket.ticketId]);
 
  }
 
  askDeleteTicket(ticket: any): void {
 
    this.ticketToDelete = ticket;
 
    this.popupMessage = 'Are you sure you want to delete this ticket?';
 
    this.showPopup = true;
 
    this.confirmDelete = true;
 
  }
 
  confirmDeletion(confirmed: boolean): void {
 
    if (confirmed && this.ticketToDelete) {
 
      this.deleteTicket(this.ticketToDelete.ticketId);
 
    }
 
    this.closePopup();
 
  }
 
  deleteTicket(id: number): void {
 
    if (id !== null) {
 
      this.ticketService.deleteTicket(id).subscribe({
 
        next: () => {
 
          this.confirmationMessage = 'Ticket deleted successfully!';
 
          this.loadTickets();
 
          this.clearMessage();
 
        },
 
        error: (err) => console.error('Delete failed:', err)
 
      });
 
    }
 
  }
 
 
  viewAgent(ticket: Ticket) {
 
    this.rt.navigate(['/ticket-details', ticket.ticketId]);
 
  }
 
  closePopup(): void {
 
    this.showPopup = false;
 
    this.confirmDelete = false;
 
    this.ticketToDelete = null;
 
  }
 
  clearMessage(): void {
 
    setTimeout(() => {
 
      this.confirmationMessage = '';
 
    }, 3000);
 
  }
 
}