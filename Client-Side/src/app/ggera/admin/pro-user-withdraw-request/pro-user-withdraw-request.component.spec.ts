import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProUserWithdrawRequestComponent } from './pro-user-withdraw-request.component';

describe('ProUserWithdrawRequestComponent', () => {
  let component: ProUserWithdrawRequestComponent;
  let fixture: ComponentFixture<ProUserWithdrawRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProUserWithdrawRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProUserWithdrawRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
