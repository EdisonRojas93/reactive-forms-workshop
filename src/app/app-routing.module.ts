import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRoomComponent } from './new-room/new-room.component';
import { RoomSeatingComponent } from './room-seating/room-seating.component';
import { SelectSeatsComponent } from './select-seats/select-seats.component';

const routes: Routes = [
  { path: 'new', component: NewRoomComponent },
  { path: 'room-seating/:id', component: RoomSeatingComponent },
  { path: 'select/:id', component: SelectSeatsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
