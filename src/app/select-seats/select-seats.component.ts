import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DbService } from '../db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-seats',
  template: `
    <div *ngIf="seatingConfig$ | async as seatingConfig; else loading">
      <h2>Select Seats - {{ seatingConfig.roomName }}</h2>
      <h3>Selected: {{ numOfSeats$ | async }} seats</h3>
    </div>
    <ng-template #loading>
      <h2>Loading room {{ roomId$ | async }}</h2>
    </ng-template>

    <form *ngIf="seatSelectForm$ | async as seatSelectForm"
          [formGroup]="seatSelectForm"
          class="room-config-form clr-form"
          (ngSubmit)="save(seatSelectForm)">

      <button type="submit" class="btn btn-success">
        <clr-icon shape="check"></clr-icon>
        Save
      </button>

      <div formArrayName="seating" class="room-config">
        <div *ngFor="let row of seatSelectForm.get('seating').controls; let i = index">
          <div [formGroupName]="i" class="clr-row seating-row">

            <div class="clr-col-sm-1 seat-num-pre">{{ row.value.rowNumber + 1 }}</div>
            <div formArrayName="seats" class="clr-col-sm-10 row-seats">

              <app-select-seat-control
                *ngFor="let seat of seatSelectForm.get(['seating', i, 'seats']).controls; let j = index"
                [formControl]="seat"></app-select-seat-control>
            </div>
            <div class="clr-col-sm-1">{{ row.value.rowNumber + 1 }}</div>

          </div>
        </div>
      </div>

    </form>
  `,
  styleUrls: ['./select-seats.component.scss']
})
export class SelectSeatsComponent implements OnInit {
  roomId$;
  seatingConfig$;
  seatSelectForm$;
  numOfSeats$;

  constructor(private db: DbService, private route: ActivatedRoute) {
    this.roomId$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id'))
    );

    this.seatingConfig$ = this.roomId$.pipe(
      switchMap((id) => this.db.getSeatingConfig(id))
    );

    this.seatSelectForm$ = this.seatingConfig$.pipe(
      map(seatingConfig => this.createForm(seatingConfig))
    );
  }

  createForm(seatingConfig) {
    const form = new FormGroup({
      id: new FormControl(seatingConfig.id),
      roomName: new FormControl(seatingConfig.roomName),
      seating: new FormArray(seatingConfig.seating.map((row, rowId) => {
        return this.generateRow(row, rowId);
      }))
    });

    return form;
  }

  generateRow(row, rowId) {
    return new FormGroup({
      rowNumber: new FormControl(rowId),
      seats: new FormArray(row.seats.map((seat, seatId) => {
        return new FormControl({
          rowId,
          seatId,
          seatType: seat,
          selected: false
        });
      }))
    });
  }

  ngOnInit() {
  }

  save(form) {
    console.log(form.value);
  }

}
