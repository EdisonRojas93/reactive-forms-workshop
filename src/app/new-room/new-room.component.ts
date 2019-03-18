import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../db.service';

const initialNewRoomVal = {
  numberOfRows: 10,
  avgSeatsInRow: 10
};

@Component({
  selector: 'app-new-room',
  template: `
    <h1>New Room</h1>

    <form (ngSubmit)="save()"
          autocomplete="off"
          class="needs-validation"
          [formGroup]="newRoomForm">

      <div class="form-group">
        <label>Room name: </label>
        <input class="form-control"
               formControlName="roomName">
        <div class="invalid-feedback"
             [ngClass]="{show: showError('roomName')}">
          Required
        </div>
      </div>

      <div class="form-group">
        <label>Number of rows:</label>
        <input class="form-control"
               type="number"
               min="1"
               formControlName="numberOfRows">
        <div class="invalid-feedback"
             [ngClass]="{show: showError('numberOfRows')}">
          Must be 1 or more
        </div>
      </div>

      <div class="form-group">
        <label>Average number of seats per row:</label>
        <input class="form-control"
               type="number"
               min="1"
               formControlName="avgSeatsInRow">
        <div class="invalid-feedback"
             [ngClass]="{show: showError('avgSeatsInRow')}">
          Must be 1 or more
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <button type="submit"
                  class="btn btn-success btn-icon"
                  [disabled]="!newRoomForm.valid">
            Save Room
          </button>
        </div>
        <div class="col">
          <button type="button"
                  class="btn btn-warning btn-icon"
                  (click)="reset()">
            Reset
          </button>
        </div>
      </div>

    </form>
  `,
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent implements OnInit {
  newRoomForm = new FormGroup({
    roomName: new FormControl('', Validators.required),
    numberOfRows: new FormControl(
      null,
      [Validators.required, Validators.min(1)]),
    avgSeatsInRow: new FormControl(
      null,
      [Validators.required, Validators.min(1)])
  });

  constructor(private db: DbService) {
    this.newRoomForm.patchValue(initialNewRoomVal);
  }

  ngOnInit() {
  }

  showError(controlName) {
    const control = this.newRoomForm.get(controlName);
    return control.touched && !control.valid;
  }

  save(form) {
    console.log(this.newRoomForm, form);

    this.db.saveRoomConfig(this.newRoomForm.value)
      .then(id => {
        console.log('room saved, id:', id);
        // this.router.navigate(['/seating-config', id]);
      });
  }


  reset() {
    this.newRoomForm.reset(initialNewRoomVal);
  }

}
