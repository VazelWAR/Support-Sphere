import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-managerviewfeedback',
  templateUrl: './managerviewfeedback.component.html',
  styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  selectedCategory: string = '';
  newFeedback: Feedback = this.createEmptyFeedback();
  userId: number;
  
  isUserModalOpen = false;
  isAgentModalOpen = false;
  isTicketModalOpen = false;
  selectedUser: any = null;
  selectedAgent: any = null;
  selectedTicket: any = null;
  userRole: string = '';

  constructor(private readonly feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    this.getFeedbacks();
  }

  sendFeedback(): void {
    this.feedbackService.sendFeedback(this.newFeedback).subscribe(
      (response) => {
        console.log('Feedback sent successfully', response);
        this.getFeedbacks();
        this.newFeedback = this.createEmptyFeedback();
      },
      (error) => {
        console.error('Error sending feedback', error);
      }
    );
  }

  getFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (data) => {
        this.feedbacks = data;
        this.filteredFeedbacks = data;
      },
      (error) => {
        console.error('Error retrieving feedbacks', error);
      }
    );
  }

  deleteFeedback(feedbackId: number): void {
    this.feedbackService.deleteFeedback(feedbackId).subscribe(
      () => {
        console.log('Feedback deleted successfully');
        this.getFeedbacks();
      },
      (error) => {
        console.error('Error deleting feedback', error);
      }
    );
  }

  getAllFeedbacksByUserId(): void {
    this.feedbackService.getFeedbacksByUserId(this.userId).subscribe(
      (data) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Error retrieving user feedbacks', error);
      }
    );
  }

  showUserProfile(user: any): void {
    this.selectedUser = user;
    this.isUserModalOpen = true;
  }

  showAgentProfile(agent: any): void {
    this.selectedAgent = agent;
    this.isAgentModalOpen = true;
  }

  showTicket(ticket: any): void {
    this.selectedTicket = ticket;
    this.isTicketModalOpen = true;
  }

  closeModal(type: string): void {
    if (type === 'user') {
      this.isUserModalOpen = false;
      this.selectedUser = null;
    } else if (type === 'agent') {
      this.isAgentModalOpen = false;
      this.selectedAgent = null;
    } else if (type === 'ticket') {
      this.isTicketModalOpen = false;
      this.selectedTicket = null;
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      target.click();
    }
  }

  filterByCategory(): void {
    if (this.selectedCategory === '') {
      this.filteredFeedbacks = this.feedbacks;
    } else {
      this.filteredFeedbacks = this.feedbacks.filter(feedback => feedback.category === this.selectedCategory);
    }
  }

  private createEmptyFeedback(): Feedback {
    return {
      feedbackId: undefined,
      feedbackText: '',
      date: new Date(),
      userId: 0,
      agentId: undefined,
      ticketId: 0,
      category: '',
      rating: 0
    };
  }
}

