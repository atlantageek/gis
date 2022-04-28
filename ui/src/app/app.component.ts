import { Component, ViewChild } from '@angular/core';
import { CommService } from './services/comm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ui';
  opened: boolean=true;
  constructor(private _api_service:CommService,) {

  }

  ngOnInit() {
    
  }
  loggedin(){
    return this._api_service.checkLogin();
  }
  getUser() {
    return this._api_service.getUser();
  }
}
      