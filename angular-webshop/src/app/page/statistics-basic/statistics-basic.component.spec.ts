import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsBasicComponent } from './statistics-basic.component';

describe('StatisticsBasicComponent', () => {
  let component: StatisticsBasicComponent;
  let fixture: ComponentFixture<StatisticsBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsBasicComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
