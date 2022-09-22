import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GASettingsComponent } from './g-a-settings.component';

describe('GASettingsComponent', () => {
  let component: GASettingsComponent;
  let fixture: ComponentFixture<GASettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GASettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GASettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
