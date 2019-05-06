import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommunicatorService } from '../communicator.service';
import { Router } from '@angular/router';
import { EditUser } from "../form-models/edit-user";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  model:EditUser;
  positions=["Διαχειριστής","Αρθρογράφος"];
  constructor(private _router: Router,
  			  private _communicator: CommunicatorService,
  			  private _auth: AuthService) { }

  ngOnInit() {
    this._auth.adminCheck().subscribe(
      res => {;},
      err => {
        console.log("ERRORRR");
            this._router.navigate(['/admin/login']);
      }
    );

  	this._communicator.getUser().subscribe(
        communicator=>{
          if(communicator){
            this.model=communicator;
          }else{
            this._router.navigate(['/admin/create-article']);
          }
        }
    );
  }

  onSubmit() {
    this.edituser();
  }

  edituser(){
  	if(this._auth.loggedIn()){
  		this._auth.editUser(this.model).subscribe(
          res => {
            this._router.navigate(['/admin/search-user']);
          },
          err => console.log(err)
        );
  	}else{
  		console.log("you are not logged");
  	}
  }

}
