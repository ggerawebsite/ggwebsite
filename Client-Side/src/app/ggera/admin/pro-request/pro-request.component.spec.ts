import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProRequestComponent } from './pro-request.component';

describe('ProRequestComponent', () => {
  let component: ProRequestComponent;
  let fixture: ComponentFixture<ProRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
