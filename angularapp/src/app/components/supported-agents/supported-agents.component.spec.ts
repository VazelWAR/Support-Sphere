import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedAgentsComponent } from './supported-agents.component';

describe('SupportedAgentsComponent', () => {
  let component: SupportedAgentsComponent;
  let fixture: ComponentFixture<SupportedAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportedAgentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportedAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
