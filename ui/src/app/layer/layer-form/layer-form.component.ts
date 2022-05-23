import { Component, Input, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommService, LayerRec } from '../../services/comm.service';
import * as xml2js from 'xml2js';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

function validateURL(): ValidatorFn {
  const urlRe = new RegExp('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = urlRe.test(control.value);
    let result = forbidden ? null : { forbiddenName: { value: control.value } };
    return result;
  }

}

@Component({
  selector: 'app-layer-form',
  templateUrl: './layer-form.component.html',
  styleUrls: ['./layer-form.component.css']
})
export class LayerFormComponent implements OnInit {
  form: FormGroup;
  wms_layer_options: string[] = [];
  layerData: LayerRec | null = null;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: LayerRec,
    private _commService: CommService,
    private dialogRef: MatDialogRef<LayerFormComponent>) {

    if (data != null) {
      this.layerData = data;
      this.form = this.fb.group({
        id: [data.id],
        enabled: [data.enabled=='t'],
        name: [data.name, [Validators.required, Validators.minLength(5)]],
        layer_type: [data.layer_type, [Validators.required]],
        uri: [data.uri, [Validators.required, validateURL()]],
        filter: [data.filter, [Validators.required]],
      });
    }
    else {
      this.form = this.fb.group({
        id: [null],
        enabled: [null],
        name: [null, [Validators.required, Validators.minLength(5)]],
        layer_type: [null, [Validators.required]],
        uri: ['https://geo.weather.gc.ca/geomet?lang=en&service=WMS&version=1.3.0&request=GetCapabilities', [Validators.required, validateURL()]],
        filter: [null, [Validators.required]],
      });
    }


  }
  ngOnChanges() {
    if (this.layerData != null) {
      this.form.controls['id'].setValue(this.layerData.id);
      this.form.controls['enabled'].setValue(this.layerData.enabled=='t');
      this.form.controls['name'].setValue(this.layerData.name);
      this.form.controls['layer_type'].setValue(this.layerData.layer_type);
      this.form.controls['uri'].setValue(this.layerData.uri);
      this.form.controls['filter'].setValue(this.layerData.filter);
    }
  }
  saveLayer() {
    this.dialogRef.close(this.form.value);
  }
  cancel() {
    this.dialogRef.close(null);
  }

  foundLayerGetNames(data:[],depth:number):string[] {
    
    let result:string[]=[];
    for (let i=0;i<data.length;i++) {
      
      if ('LAYER' in data[i]) {
        result=[...result,...this.findLayerNames(data[i],'LAYER',depth)];
      }
      else if ('NAME' in data[i]) {
        result.push(data[i]['NAME'])
      }
    }
    return result;
  }

  findLayerNames(data:any, prevkey:string, depth:number):string[] {
    let result:string[]=[];
    if ((typeof data) == 'object' && !Array.isArray(data)) {
      for(const key in data) {

        if (key == 'LAYER') {
          result=[...this.foundLayerGetNames(data[key],depth+1), ...result];
        }
        else if (key == '$') {
          
          result=[...result, ...this.findLayerNames(data[key],prevkey,depth+1)]
        }
        else{
          result=[...result, ...this.findLayerNames(data[key],key,depth+1)]
        }
      }
    }
    else  if ((typeof data) == 'object' && Array.isArray(data)) {
      //console.log('array found')
      for (let i=0;i<data.length;i++) {
        result=[...this.findLayerNames(data[i], prevkey,depth+1),...result]
      }

      
    }
    return result;
  }
  getWmsLayerOptions() {
    console.log("getting Capabilities");
    this._commService.getCapabilities(this.form.value['uri']).subscribe((data) => {
      console.log("Processed);");
      const parser = new xml2js.Parser({ strict: false, trim: true });
      parser.parseString(data, (err, result) => {

        this.wms_layer_options=this.findLayerNames(result,'ROOT',0).flat()
       
      });
    })
  }

  ngOnInit() {

  }


}
