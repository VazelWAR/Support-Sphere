import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-clientpostfeedback',
  templateUrl: './clientpostfeedback.component.html',
  styleUrls: ['./clientpostfeedback.component.css']
})
export class ClientpostfeedbackComponent implements OnInit {

  feedbackForm: FormGroup;
  submitted: boolean = false;
  showModal: boolean = false;
  modalText: string = 'Feedback submitted successfully!';
  ticketId:number;
  agentId:number;
  currUserId:number;

  userRole: string = '';

  isSubmitting: boolean = false;

  constructor(private readonly fb: FormBuilder, private readonly fs: FeedbackService, private readonly as:AuthService, private readonly act:ActivatedRoute, private readonly router: Router) {
    this.feedbackForm = this.fb.group({
      feedbackText: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', [Validators.required]],
      rating: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    this.currUserId=this.as.getAuthenticatedUserId();
    this.ticketId=+this.act.snapshot.paramMap.get('ticketId');
    this.agentId=+this.act.snapshot.paramMap.get('agentId');

    console.log("TicketID: " + this.ticketId);
    console.log("AgentID: " + this.agentId);

  }

  get f() {
    return this.feedbackForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.feedbackForm.value,this.ticketId, this.currUserId, this.agentId);
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    const formValue = this.feedbackForm.value;
    const payload: Feedback = {
      feedbackText: formValue.feedbackText,
      date: new Date(),
      category: formValue.category,
      rating: Number(formValue.rating),
        userId: this.currUserId,
        ticketId: this.ticketId,
        agentId:this.agentId
    };

    this.isSubmitting = true;
    this.fs.sendFeedback(payload).subscribe({
      next: () => {
        this.modalText = 'Feedback submitted successfully!';
        this.showModal = true;
        this.router.navigate(['/view-agents-client']);
      },
      error: (err) => {
        console.error('Feedback submit failed', err);
        alert('Failed to submit feedback. Please try again.');
        this.isSubmitting=false;
        this.feedbackForm.reset();
        this.router.navigate(['/view-agents-client']);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  closeModalAndReset(): void {
    this.showModal = false;

    this.feedbackForm.reset({
      feedbackText: '',
      category: '',
      rating: ''
    });
    this.submitted = false;
  }

}
