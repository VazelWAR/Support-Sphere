import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
 
@Component({
  selector: 'app-clientviewfeedback',
  templateUrl: './clientviewfeedback.component.html',
  styleUrls: ['./clientviewfeedback.component.css']
})
export class ClientviewfeedbackComponent implements OnInit {
 
  feedbacks: Feedback[] = [];
  showInfoModal = false;
  infoModalTitle: string;
  infoModalContent: string;
  showDeleteConfirm = false;
  feedbackToDelete: number;
  showSuccessMessage = false;
  userId:number=0;
  userRole: string = '';

  constructor(private readonly feedbackService: FeedbackService, private readonly router: Router) {}
 
  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    this.userId = parseInt(localStorage.getItem('userId') || '');
    this.getFeedbacks(this.userId);
 
  }
 
  getFeedbacks(userId: number): void {
 
    this.feedbackService.getFeedbacksByUserId(userId).subscribe(
      (data) => {
 
        this.feedbacks = data;
 
      },
      (error) => {
 
        console.error('Error retrieving feedbacks', error);
      }
 
    );
 
  }
 
  viewAgentInfo(feedback: any): void {
 
    console.log(feedback);
    if (feedback.supportAgent) {
 
      this.infoModalTitle = 'Agent Information';
      this.infoModalContent = `
        Agent Name: ${feedback.supportAgent.name}
        Expertise: ${feedback.supportAgent.expertise}
        Email: ${feedback.supportAgent.email}
        Phone Number: ${feedback.supportAgent.phone}
      `;
      console.log(feedback.supportAgent);
    } else {
 
      this.infoModalContent = 'No detailed information available for this agent.';
    }
 
    this.showInfoModal = true;
 
  }
 
  viewTicketInfo(feedback: any): void {
 
    if (feedback.ticket) {
 
      this.infoModalTitle = 'Ticket Information';
      this.infoModalContent = `
        Title: ${feedback.ticket.title}
        Description: ${feedback.ticket.description}
        Priority: ${feedback.ticket.priority}
        Status: ${feedback.ticket.status}
      `;
    } else {
 
    this.infoModalContent = 'No detailed information available for this ticket.';
 
    }
 
    this.showInfoModal = true;
  }
 
  closeInfoModal(): void {
 
    this.showInfoModal = false;
 
  }
 
  confirmDelete(feedbackId: number): void {
 
    this.feedbackToDelete = feedbackId;
    this.showDeleteConfirm = true;
 
  }
 
  closeDeleteConfirm(): void {
 
    this.showDeleteConfirm = false;
    this.feedbackToDelete = null;
 
  }
 
  deleteFeedback(): void {
 
    this.feedbackService.deleteFeedback(this.feedbackToDelete).subscribe(
      () => {
        this.feedbacks = this.feedbacks.filter(fb => fb.feedbackId !== this.feedbackToDelete);
        console.log('Deleted successfully', this.feedbacks);
        this.showSuccessMessage = true;
        this.closeDeleteConfirm();
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
 
      },
 
      (error) => {
 
        console.error('Error deleting feedback', error);
 
      }
    );
  }
 
  navigateToFeedbackList(): void {
 
      this.router.navigate(['/feedback-list']).then(() => {
        this.getFeedbacks(this.userId);
 
      });
     
  }
 
}
 
 