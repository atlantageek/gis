import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommService } from '../services/comm.service';

function validateURL():ValidatorFn {
  const urlRe = new RegExp('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
  return(control:AbstractControl):ValidationErrors | null=> {
    debugger;
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

  constructor(private fb: FormBuilder, private _commService:CommService) { 
    this.form = this.fb.group({
      enabled: [null],
      name: [null, [Validators.required, Validators.minLength(5)]],
      type: [null, [Validators.required]],
      uri: [null, [Validators.required, validateURL()]],
      // password: [null, [Validators.required, Validators.minLength(6)]],
      // confirmPassword: [null, [Validators.required]],
    });
    
  }
  saveLayer(form:FormGroup) {
    alert(form.value.name)
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
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
