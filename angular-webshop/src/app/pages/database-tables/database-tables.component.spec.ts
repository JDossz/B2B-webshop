import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTablesComponent } from './database-tables.component';

describe('DatabaseTablesComponent', () => {
  let component: DatabaseTablesComponent;
  let fixture: ComponentFixture<DatabaseTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
