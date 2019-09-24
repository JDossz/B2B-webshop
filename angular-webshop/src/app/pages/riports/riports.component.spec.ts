import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiportsComponent } from './riports.component';

describe('RiportsComponent', () => {
  let component: RiportsComponent;
  let fixture: ComponentFixture<RiportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
