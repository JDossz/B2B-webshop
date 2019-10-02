import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dynamic1Component } from './dynamic1.component';

describe('Dynamic1Component', () => {
  let component: Dynamic1Component;
  let fixture: ComponentFixture<Dynamic1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dynamic1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dynamic1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
