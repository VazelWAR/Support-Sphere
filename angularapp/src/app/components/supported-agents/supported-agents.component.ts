import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportAgent } from 'src/app/models/support-agent.model';
import { Ticket } from 'src/app/models/ticket.model';
import { SupportAgentService } from 'src/app/services/support-agent.service';
import { TicketService } from 'src/app/services/ticket.service';
 
@Component({
  selector: 'app-supported-agents',
  templateUrl: './supported-agents.component.html',
  styleUrls: ['./supported-agents.component.css']
})
export class SupportedAgentsComponent implements OnInit {
  agents: SupportAgent[] = [];
  filteredAgents: SupportAgent[] = [];
  selectedAgent: SupportAgent | null = null;
  selectedTickets: Ticket[] = [];
  message: string = '';
  showModal: boolean = false;
 
  userRole: string = '';
 
  //currUserId: number | null = this.actRt.snapshot.params['id'];
  currUserId:number=0;
  constructor(
    private readonly supportAgentService: SupportAgentService,
    private readonly ticketService: TicketService,
    private readonly rt: Router,
    private readonly actRt: ActivatedRoute
  ) {}
 
  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    this.currUserId=parseInt(localStorage.getItem('userId'));
    this.getAgentsByUserId();
  }
 
  getAgentsByUserId(): void {
    if (this.currUserId) {
      this.ticketService.getTicketsByUserId(this.currUserId).subscribe(
        (tickets) => {
          const agentsMap = new Map<number, SupportAgent>();
          tickets.forEach(ticket => {
            if (ticket.supportAgent && !agentsMap.has(ticket.supportAgent.agentId)) {
              agentsMap.set(ticket.supportAgent.agentId, ticket.supportAgent);
            }
          });
          this.agents = Array.from(agentsMap.values());
          this.filteredAgents = this.agents;
          if (this.agents.length === 0) {
            this.message = 'No supported agents found for your tickets.';
          }
        },
        (error) => {
          console.error('Error fetching agents:', error);
          this.message = 'No supported agents found for your tickets.';
        }
      );
    }
  }
 
  showTickets(agent: SupportAgent): void {
    this.selectedAgent = agent;
    this.ticketService.getTicketsByAgentId(agent.agentId).subscribe(
      (tickets) => {
        this.selectedTickets = tickets.filter(ticket => ticket.user.userId === this.currUserId);
        this.showModal = true;
      },
      (error) => {
        console.error('Error fetching tickets:', error);
        this.selectedTickets = [];
        this.showModal = true;
      }
    );
  }
 
  closeModal(): void {
    this.showModal = false;
    this.selectedTickets = [];
    this.selectedAgent = null;
  }
 
  navigateToFeedback(ticketId: number, agentId:number): void {
    this.rt.navigate(['/post-feedback', ticketId, agentId]);
  }
 
  navigateBack(): void {
    this.rt.navigate(['/view-tickets-client']);
  }
}