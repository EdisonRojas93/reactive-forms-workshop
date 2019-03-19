import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatingConfigRowComponent } from './seating-config-row.component';

describe('SeatingConfigRowComponent', () => {
  let component: SeatingConfigRowComponent;
  let fixture: ComponentFixture<SeatingConfigRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatingConfigRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatingConfigRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
