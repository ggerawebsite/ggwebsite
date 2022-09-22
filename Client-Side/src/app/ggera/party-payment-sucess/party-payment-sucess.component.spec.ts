import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyPaymentSucessComponent } from './party-payment-sucess.component';

describe('PartyPaymentSucessComponent', () => {
  let component: PartyPaymentSucessComponent;
  let fixture: ComponentFixture<PartyPaymentSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyPaymentSucessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyPaymentSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
