import { Component, Input, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommService, LayerRec } from '../../services/comm.service';
import WMSCapabilities from 'wms-capabilities';
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
        enabled: [data.enabled],
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
      this.form.controls['enabled'].setValue(this.layerData.enabled);
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
  getWmsLayerOptions() {
    console.log("getting Capabilities");
    this._commService.getCapabilities(this.form.value['uri']).subscribe((data) => {

    let capabilities=new WMSCapabilities().parse(data).toJSON();
    console.log(capabilities);



    })
  }

  ngOnInit() {

  }


}
