import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription }   from 'rxjs';
import { CommunicatorService } from '../communicator.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SearchUser } from "../form-models/search-user";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  communicator = "ONE MORE STRING";
  subscription: Subscription;
  model:SearchUser = {"email":""};
  lastsearch = {"email":""};

  constructor(private _router: Router,
  			  private _auth: AuthService,
  			  private _communicator: CommunicatorService) {

  	this.subscription = _communicator.communicatorTableUser$.subscribe(
      communicator => {
      	console.log(communicator);
        this.communicator = communicator;
        this.afterDeleteUser();
    });

  }

  ngOnInit() {
  	this._auth.adminCheck().subscribe(
        res => {;},
        err => {
              this._router.navigate(['/admin/login']);
        }
    )
    this.onSubmit();
  }

  onSubmit() {
    this.searchUser();
  }

  searchUser(){
  	if(this._auth.loggedIn()){
  		this._auth.searchUser(this.model).subscribe(
          res => {
            this.lastsearch=this.model;
            this._communicator.searchUserCommunication(res);
          },
          err => console.log(err)
        );
  	}
  }

  afterDeleteUser(){
    if(this._auth.loggedIn()){
      this._auth.searchUser(this.lastsearch).subscribe(
          res => {
            this._communicator.searchUserCommunication(res);
          },
          err => console.log(err)
        );
    }
  }

}
