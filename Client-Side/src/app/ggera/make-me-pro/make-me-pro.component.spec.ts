import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeMeProComponent } from './make-me-pro.component';

describe('MakeMeProComponent', () => {
  let component: MakeMeProComponent;
  let fixture: ComponentFixture<MakeMeProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeMeProComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeMeProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
