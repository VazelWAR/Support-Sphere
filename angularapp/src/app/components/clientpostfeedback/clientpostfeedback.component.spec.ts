import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientpostfeedbackComponent } from './clientpostfeedback.component';

describe('ClientpostfeedbackComponent', () => {
  let component: ClientpostfeedbackComponent;
  let fixture: ComponentFixture<ClientpostfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientpostfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientpostfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
