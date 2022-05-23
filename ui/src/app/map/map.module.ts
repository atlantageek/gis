import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapviewComponent } from './mapview/mapview.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    MapviewComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    LeafletModule
  ]
})
export class MapModule { }
