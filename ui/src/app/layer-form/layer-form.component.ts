import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommService, LayerRec } from '../services/comm.service';

function validateURL():ValidatorFn {
  const urlRe = new RegExp('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
  return(control:AbstractControl):ValidationErrors | null=> {
    const forbidden = urlRe.test(control.value);
    let result= forbidden ? null : {forbiddenName: {value: control.value}};
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
  wms_layer_options:string[]=[];
  @Input() layerData:LayerRec|null=null;

  constructor(private fb: FormBuilder, private _commService:CommService) { 
    this.form = this.fb.group({
      id:[null],
      enabled: [null],
      name: [null, [Validators.required, Validators.minLength(5)]],
      layer_type: [null, [Validators.required]],
      uri: [null, [Validators.required, validateURL()]],
      filter: [null, [Validators.required]],
      // password: [null, [Validators.required, Validators.minLength(6)]],
      // confirmPassword: [null, [Validators.required]],
    });
    
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
  saveLayer(form:FormGroup) {
    
    this._commService.createLayer( JSON.stringify(form.value, null, 4)).subscribe(result => {
      alert("Written")
    })
  }
  getWmsLayerOptions() {
    console.log("getting Capabilities");
    this._commService.getCapabilities(this.form.value['uri']).subscribe((data) => {
      const parser = new DOMParser()
      const dom = parser.parseFromString(data, 'application/xml')
      let xpath = '//*[local-name()="Layer"][@cascaded="0"][not(.//*[local-name()="Layer"])]/*[local-name()="Name"]';
      let targets = dom.evaluate(xpath, dom, null, XPathResult.ANY_TYPE, null);
      const nodes = [];
      let node:Node | null;
      while (node = targets.iterateNext()) {
          //console.log(node.nodeValue)
          if (node != null ){ 
            let elem=node.firstChild?.textContent;
            if (elem != null && elem != undefined)
              nodes.push(elem)

          }
          else nodes.push('UNKNOWN')
      }
      this.wms_layer_options=nodes;

  })

  }

  ngOnInit() {

  }
 

}
