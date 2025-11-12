import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportAgent } from 'src/app/models/support-agent.model';
import { Ticket } from 'src/app/models/ticket.model';
import { SupportAgentService } from 'src/app/services/support-agent.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  //ticketId: number = 3;
  ticketId: number = +this.actRt.snapshot.params['id'];
  ticket!: any
  agent!: SupportAgent;
  summaryText: string = '';
  satisfactionStatus: boolean = true;
  isLoading: boolean = true;
  errorMessage: string = '';
  showWarning: boolean = false;
  showModal: boolean = false;
  showConfirmationModal: boolean = false;
  isViewing: boolean = false;
  userRole: string = '';

  constructor(
    private readonly ticketService: TicketService,
    private readonly agentService: SupportAgentService,
    private readonly rt: Router,
    private readonly actRt: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadTicket();
    this.userRole = localStorage.getItem('role') || '';
  }




  loadTicket(): void {
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (data: Ticket) => {
        this.ticket = data;
        this.agent = this.ticket.supportAgent;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load ticket.';
        console.error(err);
        this.isLoading = false;
      }
    });

  }

  viewSummaryModal(): void {
    this.showWarning = false;
    this.isViewing = true;

  }

  openSummaryModal(): void {
    this.showModal = true;
    this.showWarning = false;
  }

  openConfirmationModal(): void {
    if (!this.summaryText.trim()) {
      this.showWarning = true;
      return;
    }
    this.showWarning = false;
    this.showConfirmationModal = true;
  }

  cancelSubmit(): void {
    this.showModal = false;
    this.showConfirmationModal = false;
    this.summaryText = '';
    this.showConfirmationModal = false;
  }

  confirmSubmit(): void {
    this.ticket.resolutionSummary = this.summaryText;
    this.ticket.satisfied = this.satisfactionStatus;
    this.updateTicket();
    this.showModal = false;
    this.showConfirmationModal = false;
    this.summaryText = '';
  }

  markAsResolved(): void {
    if (!this.summaryText.trim() && !this.ticket.resolutionSummary) {
      this.showWarning = true;
      return;
    }

    if (this.ticket.status === 'Open') {
      this.ticket.status = 'Resolved';

      this.ticket.resolutionDate ??= new Date();

      this.ticket.resolutionSummary ??= this.summaryText;
      
      this.showWarning = false;
      this.updateTicket();
    }
  }

  updateTicket(): void {
    this.ticketService.updateTicket(this.ticket.ticketId, this.ticket).subscribe({
      next: () => {
        this.loadTicket();
        console.log('Ticket updated successfully')
      },
      error: (err) => console.error('Error updating ticket:', err)
    });
  }


  navigateBack() {
    this.rt.navigate(['/view-tickets-client'])
  }
}

