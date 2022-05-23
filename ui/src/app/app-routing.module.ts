import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard} from './helpers/authguard';
import { LayerModule } from './layer/layer.module';
import { MapModule } from './map/map.module';
const routes: Routes = [
  { path: '', component: MainComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LayerModule, MapModule],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
