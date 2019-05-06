import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EventsService } from '../events.service';
import { CommunicatorService } from '../communicator.service';
import { LoginUser } from "../form-models/login-user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:LoginUser = {"email":"", "password":""};
  errorMsg = null;
  constructor(private _auth: AuthService,
              private _events: EventsService,
              private _communicator: CommunicatorService,
              private _router: Router) {}

  ngOnInit() {
    if(this._auth.loggedIn()) {
      this._auth.authCheck().subscribe(
        res => {
          this._router.navigate(['/admin/create-article'])
        },
        err => {
          this._auth.logout();
        }
      );
    }
  }

  onSubmit() {
    this.loginUser();
  }

  loginUser(){
  	this._events.loginUser(this.model)
  		.subscribe(
  			res => {
	          localStorage.setItem('token', res.token);
            localStorage.setItem('position', res.position);
	          this._router.navigate(['/admin/create-article']);
	        },
  			err =>{
          this._communicator.alertCommunication({"error":err.error});
        }
  		);
  }
}
