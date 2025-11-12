import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientviewfeedbackComponent } from './clientviewfeedback.component';

describe('ClientviewfeedbackComponent', () => {
  let component: ClientviewfeedbackComponent;
  let fixture: ComponentFixture<ClientviewfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientviewfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
