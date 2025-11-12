import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewTicketsComponent } from './manager-view-tickets.component';

describe('ManagerViewTicketsComponent', () => {
  let component: ManagerViewTicketsComponent;
  let fixture: ComponentFixture<ManagerViewTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerViewTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
