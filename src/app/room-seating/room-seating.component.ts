import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-room-seating',
  template: `
    <div *ngIf="seatingConfig$ | async as seatingConfig; else loading">
      <h2>{{ seatingConfig.roomName }}</h2>
    </div>
    <ng-template #loading>
      <h2>Loading room {{ roomId$ | async }}</h2>
    </ng-template>

    <form *ngIf="seatingConfigForm$ | async as seatingConfigForm"
          [formGroup]="seatingConfigForm"
          class="room-config-form clr-form"
          (ngSubmit)="save(seatingConfigForm)">

      <button type="submit" class="btn btn-success">
        <clr-icon shape="check"></clr-icon>
        Save
      </button>

      <div formArrayName="seating" class="room-config">
        <app-seating-config-row *ngFor="let row of seatingConfigForm.get('seating').controls; let i = index"
                                [i]="i" [row]="row"
                                class="seating-rows-config"
                                (duplicate)="duplicateRow(row, i)"
                                (deleteRow)="deleteRow(row, i)">

        </app-seating-config-row>
      </div>

    </form>
  `,
  styleUrls: ['./room-seating.component.scss']
})
export class RoomSeatingComponent implements OnInit {
  roomId$;
  seatingConfig$;
  seatingConfigForm$;

  constructor(private db: DbService, private route: ActivatedRoute) {
    this.roomId$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id'))
    );

    this.seatingConfig$ = this.roomId$.pipe(
      switchMap((id) => this.db.getSeatingConfig(id))
    );

    this.seatingConfigForm$ = this.seatingConfig$.pipe(
      map(seatingConfig => this.createForm(seatingConfig))
    );
  }

  ngOnInit() {
  }

  createForm(seatingConfig) {
    const form = new FormGroup({
      id: new FormControl(),
      roomName: new FormControl(),
      seating: new FormArray(seatingConfig.seating.map(row => {
        return this.generateRow(row);
      }))
    });

    return form;
  }

  generateRow(row) {
    const numberOfSeats = new FormControl(row.numberOfSeats);

    return new FormGroup({
      numberOfSeats,
      seats: new FormArray(row.seats.map(seat => {
        return new FormControl(seat);
      }))
    });
  }

  save(form) {
    console.log(form.value);
  }

  duplicateRow(row, rowNumber) {
  }

  deleteRow(row, rowNumber) {
  }

  changeSeatCount(numberOfSeatsControl, newNumber: number) {
  }

}
