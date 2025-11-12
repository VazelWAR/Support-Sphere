
import { Component, OnInit } from '@angular/core';
import { SupportAgentService } from 'src/app/services/support-agent.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-manager-view-tickets',
  templateUrl: './manager-view-tickets.component.html',
  styleUrls: ['./manager-view-tickets.component.css']
})
export class ManagerViewTicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  searchQuery: string = '';
  suggestedAgents: any[] = [];
  manualAgents: any[] = [];
  filteredManualAgents: any[] = [];
  agentSearchQuery: string = '';
  isModalOpen: boolean = false;
  isManualVisible: boolean = false;
  selectedTicket: Ticket | null = null;

  userRole: string = '';

  constructor(
    private readonly ticketService: TicketService,
    private readonly agentService: SupportAgentService
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getAllTickets().subscribe(response => {
      this.tickets = response;
      this.filteredTickets = response;
    });
  }

  loadAgents(): void {
    this.agentService.getAllAgents().subscribe(agentsResponse => {
      this.suggestedAgents = [];
      this.manualAgents = [];
      this.filteredManualAgents = [];

      if (this.selectedTicket) {
        agentsResponse.forEach(agent => {
          if (agent.status === 'Available') {
            const issueWords = this.selectedTicket.issueCategory.toLowerCase().split(' ');
            const expertiseWords = agent.expertise.toLowerCase().split(' ');
            const hasMatch = issueWords.some(issueWord => expertiseWords.includes(issueWord));

            if (hasMatch) {
              this.suggestedAgents.push(agent);
            } else {
              this.manualAgents.push(agent);
            }
          }
        });

        this.manualAgents = this.manualAgents.filter(agent => !this.suggestedAgents.includes(agent));
        this.filteredManualAgents = [...this.manualAgents];
      }
    });
  }

  searchTickets(): void {
    this.filteredTickets = this.tickets.filter(ticket =>
      this.searchQuery
        ? ticket.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          ticket.issueCategory.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true
    );
  }

  searchAgents(): void {
    const query = this.agentSearchQuery?.toLowerCase() ?? '';
    this.filteredManualAgents = this.manualAgents.filter(agent => {
      const name = agent.name?.toLowerCase() ?? '';
      const expertise = agent.expertise?.toLowerCase() ?? '';
      return query ? name.includes(query) ?? expertise.includes(query) : true;
    });
  }
   
  openModal(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.isModalOpen = true;
    this.loadAgents();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isManualVisible = false;
    this.selectedTicket = null;
  }

  toggleManualList(): void {
    this.isManualVisible = !this.isManualVisible;
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.closeModal();
    }
  }

  assignAgent(agent: any): void {
    if (!this.selectedTicket) return;
  

    const updatedTicket: any = {
      ...this.selectedTicket,
      supportAgent: {
        agentId: agent.agentId
      }
    };
  
    
    this.ticketService.updateTicket(this.selectedTicket.ticketId, updatedTicket).subscribe((data) => {
      console.log(data);
      this.loadTickets();
      this.closeModal();
    });
  
    alert(`Agent ${agent.name} has been assigned to the ticket.`);
  }

  closeTicket(ticket: Ticket): void {
    const updatedTicket: Ticket = {
      ...ticket,
      status: "Closed"
    };

    this.ticketService.updateTicket(ticket.ticketId, updatedTicket).subscribe(() => {
      this.loadTickets();
      this.closeModal();
    });

    alert(`Ticket is closed!`);
  }
}
