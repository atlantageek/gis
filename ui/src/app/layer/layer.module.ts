import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayerRoutingModule } from './layer-routing.module';
import { LayerEditorComponent } from './layer-editor/layer-editor.component';
import { LayerFormComponent } from './layer-form/layer-form.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayerEditorComponent,
    LayerFormComponent],
  imports: [
    CommonModule,
    LayerRoutingModule,
    AngularMaterialModule,
    FormsModule, ReactiveFormsModule 
  ]
})
export class LayerModule { }
