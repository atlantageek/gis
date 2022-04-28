import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommService } from 'src/app/services/comm.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  username='';
  password='';


  constructor(private _api_service:CommService, private router:Router) { }

  ngOnInit(): void {

  }

  login():void {
    
    this._api_service.login(this.username, this.password).subscribe(
      (result ) => {
        console.log("Logged in result");
        console.log(result)
        this.router.navigateByUrl('/');
      },
      err => {
        alert("Failed to login")
    
      }
    )
  }

}
