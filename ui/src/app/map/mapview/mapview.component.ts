import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, tileLayer, latLng, TileLayer,WMSParams, WMSOptions } from 'leaflet';
import { CommService } from 'src/app/services/comm.service';


@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements OnInit {
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  options = {
    // layers: [
    //   tileLayer.wms('http://ows.mundialis.de/services/service?', { layers: 'TOPO-OSM-WMS'    })
    // ],
    zoom: 5
    ,
    center: latLng([ 46.879966, -121.726909 ])
  };   
  public map: Map|null=null;
  public zoom: number=-1;
  constructor( private commService:CommService) {

   }

  ngOnInit(): void { 
    console.log("Init")
  }
  ngAfterViewInit(): void {
    
 
  }
  public onMapReady(mapx:Map): void {
    this.map=mapx;
    this.commService.getLayers().subscribe((layers) => {
      layers.filter(layer => layer.layer_type != 'secondary' && layer.enabled == 't').forEach(layer => {
        const tiles=tileLayer.wms(layer.uri, { layers: layer.filter  })
        tiles.addTo(<Map>this.map)
      })
      layers.filter(layer => layer.layer_type == 'secondary' && layer.enabled=='t').forEach(layer => {
        debugger;
        const tiles=tileLayer.wms(layer.uri, { layers: layer.filter, format:'image/png', transparent:true  })
        tiles.addTo(<Map>this.map)
      })
      // layers.forEach(layer=> {
      //   if (layer.layer_type == 'secondary') {
      //     const tiles=tileLayer.wms(layer.uri, { layers: layer.filter, format:'image/png', transparent:true  })
      //     tiles.addTo(<Map>this.map)
      //   }
      //   else {
      //     const tiles=tileLayer.wms(layer.uri, { layers: layer.filter   })
      //     tiles.addTo(<Map>this.map)
      //   }
      // });
    })
    // const tiles=tileLayer.wms('http://ows.mundialis.de/services/service?', { layers: 'TOPO-OSM-WMS'    })
    // tiles.addTo(this.map)
    // this.map = new Map('map', {
    //   center: [ 39.8282, -98.5795 ],
    //   zoom: 3
    // });

    //const tiles = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   minZoom: 3,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });

    // tiles.addTo(this.map);
  }
  


}
