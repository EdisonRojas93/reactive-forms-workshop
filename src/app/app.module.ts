import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomSeatingComponent } from './room-seating/room-seating.component';
import { SeatingConfigRowComponent } from './seating-config-row/seating-config-row.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SeatControlComponent } from './seat-control/seat-control.component';

@NgModule({
  declarations: [
    AppComponent,
    NewRoomComponent,
    RoomSeatingComponent,
    SeatingConfigRowComponent,
    SeatControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ClarityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
