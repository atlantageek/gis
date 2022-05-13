import { getLocaleDayPeriods } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommService,LayerRec } from '../../services/comm.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LayerFormComponent } from '../layer-form/layer-form.component';
@Component({
  selector: 'app-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.css']
})
export class LayerEditorComponent implements OnInit {
  layerList:LayerRec[]=[];
  currLayer:LayerRec | null=null;
  displayedColumns = ['enabled','name','layer_type'];
  constructor(private _api_service:CommService, private router:Router,public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    console.log("Layer Editor star")
    this._api_service.getLayers().subscribe((data:LayerRec[]) => {
      this.layerList=data;
    })
  }

  loadData(layerId:number) {
    this._api_service.getLayer(layerId).subscribe((data:LayerRec) => {
      this.currLayer=data;
    })
  }
  newLayer() {
    const dialogRef = this.dialog.open(LayerFormComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
