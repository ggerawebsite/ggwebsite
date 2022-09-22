import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyProComponent } from './lobby-pro.component';

describe('LobbyProComponent', () => {
  let component: LobbyProComponent;
  let fixture: ComponentFixture<LobbyProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyProComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbyProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
