import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-seating-config-row',
  template: `
    <div [formGroup]="row"
         class="seating-rows-config clr-row">
      <div class="clr-col-sm-1">
        <input type="number" formControlName="numberOfSeats">
      </div>

      <div class="clr-col-sm-1 row-number">
        <span>{{ i + 1 }}</span>
      </div>

      <div formArrayName="seats" class="clr-col-sm-8 row-seats">
        <app-seat-control *ngFor="let seat of row.get(['seats']).controls; let j=index"
                          [seatId]="j"
                          [formControlName]="j"></app-seat-control>
      </div>

      <div class="clr-col-sm-2">
        <button type="button"
                class="btn btn-icon btn-sm btn-primary btn-row-action"
                (click)="duplicate.emit()">
          <clr-icon shape="copy"></clr-icon>
        </button>
        <button type="button"
                class="btn btn-icon btn-sm btn-warning btn-row-action"
                (click)="deleteRow.emit()">
          <clr-icon shape="remove"></clr-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./seating-config-row.component.scss']
})
export class SeatingConfigRowComponent implements OnInit {
  @Input() i;
  @Input() row;
  @Output() duplicate = new EventEmitter();
  @Output() deleteRow = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
