import { getLocaleDayPeriods } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommService, LayerRec } from '../../services/comm.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LayerFormComponent } from '../layer-form/layer-form.component';
@Component({
  selector: 'app-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.css']
})
export class LayerEditorComponent implements OnInit {
  layerList: LayerRec[] = [];
  currLayer: LayerRec | null = null;
  displayedColumns = ['enabled', 'name', 'layer_type','action'];
  constructor(private _commService: CommService, private router: Router, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    console.log("Layer Editor star")
    this.updateList();

  }
  updateList():void {
    this._commService.getLayers().subscribe((data: LayerRec[]) => {
      this.layerList = data;
    })
  }

  loadData(layerId: number) {
    this._commService.getLayer(layerId).subscribe((data: LayerRec) => {
      this.showDialog(data);
    })
  }
  deleteData(layerId: number) {
    this._commService.deleteLayer(layerId).subscribe((data: LayerRec) => {
      this.updateList();
    })
  }
  newLayer() {
    this.showDialog(null);
  }
  showDialog(data: LayerRec | null) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    // {
    //   width: '250px',
    //   data: {},
    // }
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(LayerFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.id == null) {

          this._commService.createLayer(JSON.stringify(result, null, 4)).subscribe(result => {
            this.updateList()
          })
        }
        else {
          this._commService.updateLayer(JSON.stringify(result, null, 4), result.id).subscribe(result => {
            this.updateList();
          });
        }

      }
    });
  }
}
