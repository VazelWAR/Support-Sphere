import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewAgentsComponent } from './manager-view-agents.component';

describe('ManagerViewAgentsComponent', () => {
  let component: ManagerViewAgentsComponent;
  let fixture: ComponentFixture<ManagerViewAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerViewAgentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
