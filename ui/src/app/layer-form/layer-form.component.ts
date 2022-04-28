import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-layer-form',
  templateUrl: './layer-form.component.html',
  styleUrls: ['./layer-form.component.css']
})
export class LayerFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      enabled: [null],
      name: [null, [Validators.required, Validators.minLength(5)]],
      type: [null, [Validators.required]],
      source: [null, [Validators.required]],
      uri: [null, [Validators.required]],
      // password: [null, [Validators.required, Validators.minLength(6)]],
      // confirmPassword: [null, [Validators.required]],
    });
    
  }

  ngOnInit() {

  }
 

}
