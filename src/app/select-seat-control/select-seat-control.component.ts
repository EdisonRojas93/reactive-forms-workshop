import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Host,
  Input,
  Optional,
  SkipSelf
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SeatTypesService } from '../seat-types.service';

@Component({
  selector: 'app-select-seat-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectSeatControlComponent),
    }
  ],
  template: `
    <button type="button"
            [style.backgroundColor]="_seatType?.color"
            (click)="select()"
            [disabled]="disabled"
            [ngClass]="{disabled: disabled, selected: _value.selected}">
      <span>{{ _value.seatId + 1 }}</span>
    </button>
  `,
  styleUrls: ['./select-seat-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectSeatControlComponent {
  _seatType;
  _value;
  control;

  @Input()
  set value(val) {
    this._value = val;
    this._seatType = this.seatTypesService.seatTypes[val.seatType || 1];
  }

  @Input() disabled = false;

  constructor(
    private seatTypesService: SeatTypesService,
    private cd: ChangeDetectorRef,
    @Optional() @Host() @SkipSelf()
    private controlContainer: ControlContainer
  ) {

  }

  select() {
    this._value = { ...this._value, selected: !this._value.selected };
  }

}
