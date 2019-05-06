import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  loggedIn(): boolean{
  	return this._auth.loggedIn();
  }

  isAdmin(): boolean{
    return this._auth.isAdmin();;
  }

  logout(){
  	this._auth.logout();
  }

}
