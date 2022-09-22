import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersNewPageComponent } from './players-new-page.component';

describe('PlayersNewPageComponent', () => {
  let component: PlayersNewPageComponent;
  let fixture: ComponentFixture<PlayersNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersNewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
