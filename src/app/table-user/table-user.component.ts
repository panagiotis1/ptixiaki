import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicatorService } from '../communicator.service';
import { Subscription }   from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  communicator: {};


  constructor(private _communicator: CommunicatorService,
  			  private _auth: AuthService) {
  	this.subscription = _communicator.communicatorSearchUser$.subscribe(
      communicator => {
        this.communicator = communicator;
    });
  }

  ngOnInit() {
  }

  editUser(ID: number, email: string, birthdate: string, name: string, surname: string ,password: string, phonenumber: number, position: string, registrationDate: string){
    console.log(email);
    this._communicator.editUserCommunication({"ID":ID, "email":email, "birthdate":birthdate, "name":name, "surname":surname, "password":password, "phonenumber":phonenumber, "position":position, "registrationDate":registrationDate});
  }

  deleteUser(ID: number){
  	this._auth.deleteUser(ID).subscribe(
      events => {
      	this._communicator.tableUserCommunication("deleted user");
	  },
	  err => {
          console.log(err);
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
