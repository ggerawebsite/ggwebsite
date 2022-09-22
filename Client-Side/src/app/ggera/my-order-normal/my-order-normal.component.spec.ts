import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderNormalComponent } from './my-order-normal.component';

describe('MyOrderNormalComponent', () => {
  let component: MyOrderNormalComponent;
  let fixture: ComponentFixture<MyOrderNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOrderNormalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOrderNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
