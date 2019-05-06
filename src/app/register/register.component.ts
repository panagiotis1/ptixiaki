import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EventsService } from '../events.service';
import { CommunicatorService } from '../communicator.service';
import { RegisterUser } from "../form-models/register-user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:RegisterUser = {"name":"", "surname":"", "email":"", "password":"", "phonenumber":null};
  constructor(private _auth: AuthService,
              private _events: EventsService,
              private _communicator: CommunicatorService,
              private _router: Router) { }

  ngOnInit() {
    if(this._auth.loggedIn()) {
      this._auth.authCheck().subscribe(
        res => {this._router.navigate(['/admin/create-article']);},
        err => {this._auth.logout();}
      );
    }
  }

  onSubmit() { 
    this.registerUser();
  }
  
  registerUser() {
  	this._events.registerUser(this.model)
        .subscribe(
          res => {
            this._communicator.alertCommunication({"success":res.message});
          },
          err => {
            this._communicator.alertCommunication({"error":err.error});
          }
        );
  }
}
