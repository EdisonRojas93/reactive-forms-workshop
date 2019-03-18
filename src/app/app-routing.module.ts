import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRoomComponent } from './new-room/new-room.component';

const routes: Routes = [
  { path: 'new', component: NewRoomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
