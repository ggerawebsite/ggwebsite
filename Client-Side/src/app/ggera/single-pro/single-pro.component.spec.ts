import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProComponent } from './single-pro.component';

describe('SingleProComponent', () => {
  let component: SingleProComponent;
  let fixture: ComponentFixture<SingleProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleProComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
