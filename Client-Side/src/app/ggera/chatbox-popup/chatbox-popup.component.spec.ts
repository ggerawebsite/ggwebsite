import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatboxPopupComponent } from './chatbox-popup.component';

describe('ChatboxPopupComponent', () => {
  let component: ChatboxPopupComponent;
  let fixture: ComponentFixture<ChatboxPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatboxPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatboxPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
