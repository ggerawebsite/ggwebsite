import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageNew1Component } from './home-page-new1.component';

describe('HomePageNew1Component', () => {
  let component: HomePageNew1Component;
  let fixture: ComponentFixture<HomePageNew1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageNew1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageNew1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
