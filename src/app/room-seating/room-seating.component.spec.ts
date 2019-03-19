import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSeatingComponent } from './room-seating.component';

describe('RoomSeatingComponent', () => {
  let component: RoomSeatingComponent;
  let fixture: ComponentFixture<RoomSeatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomSeatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSeatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
