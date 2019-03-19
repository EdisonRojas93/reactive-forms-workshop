import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRoomComponent } from './new-room/new-room.component';
import { RoomSeatingComponent } from './room-seating/room-seating.component';

const routes: Routes = [
  { path: 'new', component: NewRoomComponent },
  { path: 'room-seating/:id', component: RoomSeatingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
