import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommService,LayerRec } from '../services/comm.service';

@Component({
  selector: 'app-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.css']
})
export class LayerEditorComponent implements OnInit {
  layerList:LayerRec[]=[];
  displayedColumns = ['enabled','name','layer_type'];
  constructor(private _api_service:CommService, private router:Router) {
    
   }

  ngOnInit(): void {
    console.log("Layer Editor star")
    this._api_service.getLayers().subscribe((data:LayerRec[]) => {
      this.layerList=data;
      debugger;
    })
  }

}
