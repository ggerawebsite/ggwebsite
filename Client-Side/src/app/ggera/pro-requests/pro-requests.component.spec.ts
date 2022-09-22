import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProRequestsComponent } from './pro-requests.component';

describe('ProRequestsComponent', () => {
  let component: ProRequestsComponent;
  let fixture: ComponentFixture<ProRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
