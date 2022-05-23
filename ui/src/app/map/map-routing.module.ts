import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapviewComponent } from './mapview/mapview.component';

const routes: Routes = [
  { path: 'map/index', component: MapviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
