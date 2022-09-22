import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyListingSubscriberComponent } from './lobby-listing-subscriber.component';

describe('LobbyListingSubscriberComponent', () => {
  let component: LobbyListingSubscriberComponent;
  let fixture: ComponentFixture<LobbyListingSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyListingSubscriberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbyListingSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
