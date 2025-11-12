import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportAgentManagementComponent } from './support-agent-management.component';

describe('SupportAgentManagementComponent', () => {
  let component: SupportAgentManagementComponent;
  let fixture: ComponentFixture<SupportAgentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportAgentManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportAgentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
