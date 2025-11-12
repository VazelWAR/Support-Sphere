import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.css']
})
export class TicketManagementComponent implements OnInit {
  ticketForm: FormGroup;
  submitted: boolean = false;

  // Modal popup controls
  showModal: boolean = false;
  modalText: string = 'Ticket Added Successfully!';

  // Add/Edit controls
  isEditing: boolean = false;
  ticketId: number | null = null;
  currUserId: number;

  userRole: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly ticketService: TicketService,
    private readonly authService: AuthService
  ) {

  }

 

  ngOnInit(): void {

    this.currUserId = +localStorage.getItem('userId') || null;
    this.userRole = localStorage.getItem('role') || '';

    console.log(this.currUserId);

    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      issueCategory: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['Open'],
      userId: [this.currUserId],
      agentId: [null],
      createdDate: [new Date().toISOString()],
      resolutionDate: [],
      satisfied: [false],
      resolutionSummary: ['']
    });


    // If route contains :id then we are in edit mode
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('ticketId');
      this.isEditing = !!idParam;

      if (this.isEditing) {
        this.ticketId = Number(idParam);
        if (Number.isNaN(this.ticketId)) {
          alert('Invalid ticket id.');
          this.router.navigate(['/view-tickets-client']);
          return;
        }

        // Load existing ticket and patch the form
        this.ticketService.getTicketById(this.ticketId).subscribe({
          next: (ticket: Ticket) => {
            // Patch only fields present in the form
            console.log(ticket);
            this.ticketForm.patchValue({
              title: ticket.title,
              description: ticket.description,
              issueCategory: ticket.issueCategory,
              priority: ticket.priority,
              agentId: ticket.agentId // Make sure this is set
            });

          },
          error: () => {
            alert('Failed to load ticket or ticket not found.');
            this.router.navigate(['/view-tickets-client']);
          }
        });
      }
    });
  }

  get f() {
    return this.ticketForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.ticketForm.invalid) {
      return;
    }

    const formValue = this.ticketForm.value;

    const newTicket = {
      ...formValue,
      user: { userId: formValue.userId },
      supportAgent: { agentId: formValue.agentId }
    }

    if (!this.isEditing) {

      this.ticketService.addTicket(newTicket).subscribe({
        next: () => {
          this.modalText = 'Ticket Added Successfully!';
          this.showModal = true;
        },
        error: () => {
          alert('Failed to add ticket. Please try again.');
        }
      });
    } else if (this.ticketId !== null) {
      // UPDATE
      this.ticketService.updateTicket(this.ticketId, newTicket).subscribe({
        next: () => {
          this.modalText = 'Ticket Updated Successfully!';
          this.showModal = true;
        },
        error: () => {
          alert('Failed to update ticket. Please try again.');
        }
      });
    }
  }

  /**
   * Closes the modal and resets or navigates based on the mode
   */
  closeModalAndReset(): void {
    this.showModal = false;

    if (this.isEditing) {
      // After editing, go back to list
      this.router.navigate(['/view-tickets-client']);
    } else {
      // After adding, reset the form for another entry
      this.ticketForm.reset({
        title: '',
        description: '',
        issueCategory: '',
        priority: ''
      });
      this.submitted = false;
      // Or navigate to list if you prefer:
      this.router.navigate(['/view-tickets-client']);
    }
  }

  /**
   * Optional: Cancel button handler (if you add a cancel button in UI)
   */
  onCancel(): void {
    this.router.navigate(['/view-tickets-client']);
  }
}