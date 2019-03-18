import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

const initialNewRoomVal = {
  numberOfRows: 10,
  avgSeatsInRow: 10
};

@Component({
  selector: 'app-new-room',
  template: `
    <h1>New Room</h1>

    <form autocomplete="off"
          class="needs-validation">

      <div class="form-group">
        <label>Room name: </label>
        <input class="form-control">
        <div class="invalid-feedback"
             [ngClass]="{show: showError('roomName')}">
          Required
        </div>
      </div>

      <div class="form-group">
        <label>Number of rows:</label>
        <input class="form-control">
        <div class="invalid-feedback"
             [ngClass]="{show: showError('numberOfRows')}">
          Must be 1 or more
        </div>
      </div>

      <div class="form-group">
        <label>Average number of seats per row:</label>
        <input class="form-control">
        <div class="invalid-feedback"
             [ngClass]="{show: showError('avgSeatsInRow')}">
          Must be 1 or more
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <button type="submit"
                  class="btn btn-success btn-icon"
                  [disabled]="">
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

  constructor(private db: DbService) {
  }

  ngOnInit() {
  }

  showError(controlName) {
  }

  save() {
    this.db.saveRoomConfig(null)
      .then(id => {
        console.log('room saved, id:', id);
        // this.router.navigate(['/seating-config', id]);
      });
  }

  reset() {
  }

}
