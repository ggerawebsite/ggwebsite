import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubscriberProfileComponent } from './view-subscriber-profile.component';

describe('ViewSubscriberProfileComponent', () => {
  let component: ViewSubscriberProfileComponent;
  let fixture: ComponentFixture<ViewSubscriberProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubscriberProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubscriberProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
