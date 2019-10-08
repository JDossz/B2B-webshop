import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Barchart1Component } from './barchart1.component';

describe('Barchart1Component', () => {
  let component: Barchart1Component;
  let fixture: ComponentFixture<Barchart1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Barchart1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Barchart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
