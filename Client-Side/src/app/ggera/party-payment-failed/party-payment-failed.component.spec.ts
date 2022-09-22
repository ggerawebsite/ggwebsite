import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyPaymentFailedComponent } from './party-payment-failed.component';

describe('PartyPaymentFailedComponent', () => {
  let component: PartyPaymentFailedComponent;
  let fixture: ComponentFixture<PartyPaymentFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyPaymentFailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyPaymentFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
