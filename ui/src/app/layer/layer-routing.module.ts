import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayerEditorComponent } from './layer-editor/layer-editor.component';

const routes: Routes = [
  { path: 'layer/index', component: LayerEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayerRoutingModule { }
