import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientnavComponent } from './clientnav.component';

describe('ClientnavComponent', () => {
  let component: ClientnavComponent;
  let fixture: ComponentFixture<ClientnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
