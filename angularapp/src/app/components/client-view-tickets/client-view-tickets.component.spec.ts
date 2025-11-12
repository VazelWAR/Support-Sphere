import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewTicketsComponent } from './client-view-tickets.component';

describe('ClientViewTicketsComponent', () => {
  let component: ClientViewTicketsComponent;
  let fixture: ComponentFixture<ClientViewTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientViewTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientViewTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
