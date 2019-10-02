import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrdersComponent } from './update-orders.component';

describe('UpdateOrdersComponent', () => {
  let component: UpdateOrdersComponent;
  let fixture: ComponentFixture<UpdateOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOrdersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
