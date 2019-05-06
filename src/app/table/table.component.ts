import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicatorService } from '../communicator.service';
import { Subscription }   from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  communicator: {};

  constructor(private _communicator: CommunicatorService,
  			  private _auth: AuthService) {
  	this.subscription = _communicator.communicatorSearch$.subscribe(
      communicator => {
        this.communicator = communicator;
    });
    //this._communicator.tableCommunication("string1234567689");
  }

  ngOnInit() {	
  }

  editArticle(ID: number, title: string, description: string, keywords: string, article: string, category){
  	this._communicator.editCommunication({"ID":ID, "title":title, "description":description, "keywords":keywords, "article":article, "category":category});
  }

  deleteArticle(ID: number){
  	this._auth.deleteArticle(ID).subscribe(
      events => {
      	this._communicator.tableCommunication("deleted article");
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
