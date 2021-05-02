import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from './components/map/map.component';

const routes: Routes = [
  {path: 'home' , component: MapComponent},
  {path: '**', pathMatch: 'full' , redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
