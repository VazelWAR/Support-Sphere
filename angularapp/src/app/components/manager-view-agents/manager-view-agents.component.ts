import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupportAgentService } from 'src/app/services/support-agent.service';
import { SupportAgent } from 'src/app/models/support-agent.model';

@Component({
  selector: 'app-manager-view-agents',
  templateUrl: './manager-view-agents.component.html',
  styleUrls: ['./manager-view-agents.component.css']
})
export class ManagerViewAgentsComponent implements OnInit {
  agents: SupportAgent[] = [];
  filteredAgents: SupportAgent[] = [];
  searchTerm: string = '';
  filterStatus: string = '';
  message: string = '';
  selectedProfileAgent: SupportAgent | null = null;
  isProfileModalOpen: boolean = false;
  isErrorPopupOpen: boolean = false;
  errorMessage: string = '';

  userRole: string = '';

  showPopup: boolean = false;
  popupMessage: string = '';
  agentToDelete: SupportAgent;


  constructor(private readonly router: Router, private readonly supportAgentService: SupportAgentService) { }

  ngOnInit(): void {

    this.userRole = localStorage.getItem('role') || '';

    this.getAllAgents();
    const state = history.state;
    if (state.message) {
      this.message = state.message;
      setTimeout(() => this.message = '', 3000);
    }
  }

  getAllAgents(): void {
    this.supportAgentService.getAllAgents().subscribe(
      (data) => {
        this.agents = data.map(agent => {
          agent.status ??= 'Available'; // Set default status if not set
          return agent;
        });
        this.filteredAgents = this.agents;
      },
      (error) => console.error('Error fetching agents:', error)
    );
  }

  onSearch() {
    this.filteredAgents = this.agents.filter(agent =>
      agent.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || agent.expertise.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onFilter() {
    this.filteredAgents = this.agents.filter(agent =>
      !this.filterStatus || agent.status === this.filterStatus
    );
  }

  onEdit(agent: SupportAgent) {
    this.router.navigate(['/edit-agent', agent.agentId]);
  }

  // onDelete(agent: SupportAgent) {
  //   if (confirm('Are you sure you want to delete this agent and the tickets associated with them?')) {
  //     this.supportAgentService.deleteAgent(agent.agentId).subscribe(
  //       () => {
  //         this.agents = this.agents.filter(a => a !== agent);
  //         this.filteredAgents = this.agents;
  //         this.message = 'Support Agent Deleted Successfully!';
  //         setTimeout(() => this.message = '', 3000);
  //       },
  //       (error) => {
  //         console.error('Error deleting agent:', error);
  //         this.showErrorPopup(error.error);
  //       }
  //     );
  //   }
  // }

  askDeleteAgent(agent: SupportAgent): void {
    this.agentToDelete = agent;
    this.popupMessage = 'Are you sure you want to delete this agent and the tickets associated with them?';
    this.showPopup = true;
  }

  confirmDeletion(confirmed: boolean): void {
    if (confirmed && this.agentToDelete) {
      this.supportAgentService.deleteAgent(this.agentToDelete.agentId).subscribe(
        () => {
          this.agents = this.agents.filter(a => a !== this.agentToDelete);
          this.filteredAgents = this.agents;
          this.message = 'Support Agent Deleted Successfully!';
          this.clearMessage();
        },
        (error) => {
          console.error('Error deleting agent:', error);
          this.showErrorPopup(error.error);
        }
      );
    }
    this.closeDeletePopup();
  }

  clearMessage(): void {
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  closeDeletePopup(): void {
    this.showPopup = false;
    this.agentToDelete = null;
  }

  showErrorPopup(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.isErrorPopupOpen = true;
    // Automatically close the popup after 3 seconds
    setTimeout(() => this.closeErrorPopup(), 3000);
  }

  closeErrorPopup() {
    this.isErrorPopupOpen = false;
  }

  onToggleStatus(agent: SupportAgent) {
    agent.status = agent.status === 'Available' ? 'Unavailable' : 'Available';
    this.supportAgentService.updateAgent(agent.agentId, agent).subscribe(
      () => {
        this.message = 'Support Agent Status Updated Successfully!';
        setTimeout(() => this.message = '', 3000);
      },
      (error) => console.error('Error updating agent status:', error)
    );
  }

  onViewProfile(agent: SupportAgent) {
    this.selectedProfileAgent = agent;
    this.isProfileModalOpen = true;
  }

  closePopup() {
    this.message = '';
  }

  closeProfile() {
    this.selectedProfileAgent = null;
    this.isProfileModalOpen = false;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      target.click();
    }
  }
}