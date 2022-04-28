import { Component, Input, OnInit } from '@angular/core';
import { CommService } from "src/app/services/comm.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Roles: any = ['Admin', 'Author', 'Reader'];
  @Input() username=""
  constructor(private _api_service:CommService) { }
  ngOnInit() {
  }
  register() {
    this._api_service.register("data");
  }
}
