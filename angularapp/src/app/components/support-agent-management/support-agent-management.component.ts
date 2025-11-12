import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportAgent } from 'src/app/models/support-agent.model';
import { SupportAgentService } from 'src/app/services/support-agent.service';
 
@Component({
  selector: 'app-support-agent-management',
  templateUrl: './support-agent-management.component.html',
  styleUrls: ['./support-agent-management.component.css']
})
export class SupportAgentManagementComponent implements OnInit {
  agentForm: FormGroup;
 
  isEditing: boolean = false;
  editingAgentId: number | null = null;
  modalText: string = '';
  showModal: boolean = false;
 
  userRole: string = '';

  constructor(
 
    private readonly fb: FormBuilder,
    private readonly agentService: SupportAgentService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
 
  ) {}
 
  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    this.agentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      expertise: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      status: ['Available'],
      addedDate: [new Date().toISOString()],
      shiftTiming: ['', Validators.required],
      remarks: ['', Validators.required],
      profile: [null]
 
    });
 
    // Check if editing mode
    this.route.paramMap.subscribe(params => {
 
      const idParam = params.get('agentId'); // use 'agentId' or whatever your route param is
      if (idParam) {
        this.isEditing = true;
        this.editingAgentId = Number(idParam);
 
        this.agentService.getAgentById(this.editingAgentId).subscribe({
          next: (agent: SupportAgent) => {
            // Prefill the form with fetched agent data
            this.agentForm.patchValue({
 
              name: agent.name,
              email: agent.email,
              phone: agent.phone,
              expertise: agent.expertise,
              experience: agent.experience,
              status: agent.status,
              addedDate: agent.addedDate,
              shiftTiming: agent.shiftTiming,
              remarks: agent.remarks,
              // profile is optional, leave blank for editing
 
 
            });
          },
          error: (err) => {
 
            console.error('Error fetching agent:', err);
            alert('Failed to load agent details.');
            this.router.navigate(['/view-agents-manager']);
 
          }
        });
      }
    });
  }
 
  onSubmit(): void {
 
    if (this.agentForm.invalid) return;
 
 
    if (!this.isEditing) {
      // ADD agent
      this.agentService.addAgent(this.agentForm.value).subscribe({
        next: () => {
 
          this.modalText = 'Support Agent Added Successfully!';
          this.showModal = true;
          this.agentForm.reset();
 
        },
 
        error: () => alert('Failed to add agent.')
 
      });
    } else if (this.editingAgentId !== null) {
      // UPDATE agent
      this.agentService.updateAgent(this.editingAgentId, this.agentForm.value).subscribe({
        next: () => {
 
          this.modalText = 'Support Agent Updated Successfully!';
 
          this.showModal = true;
          this.agentForm.reset();
          this.isEditing = false;
          this.editingAgentId = null;
 
        },
        error: () => alert('Failed to update agent.')
      });
    }
  }
 
  closeModal(): void {
 
    this.showModal = false;
    this.router.navigate(['/view-agents-manager']);
   
  }
 
  onCancel(): void {
 
    this.router.navigate(['/view-agents-manager']);
 
  }
}
 
 