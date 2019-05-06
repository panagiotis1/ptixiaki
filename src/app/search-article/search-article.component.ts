import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EventsService } from '../events.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommunicatorService } from '../communicator.service';
import { Subscription }   from 'rxjs';
import { SearchArticle } from "../form-models/search-article";

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.css']
})
export class SearchArticleComponent implements OnInit {
  subscription: Subscription;
  communicator = "ONE STRING";
  model:SearchArticle = {'title':"", 'keywords':"", 'searchdatefrom':"", 'searchdateto':"", 'category':"Διάλεξε κατηγορία"};
  categories = [];
  lastsearch:SearchArticle = {'title':"", 'keywords':"", 'searchdatefrom':"", 'searchdateto':"", 'category':"Διάλεξε κατηγορία"};

  constructor(private _router: Router,
  			  private _auth: AuthService,
          private _events: EventsService,
  			  private _communicator: CommunicatorService) {
  	
  	this.subscription = _communicator.communicatorTable$.subscribe(
      communicator => {
        this.communicator = communicator;
        this.afterDelete();
    });
  }

  ngOnInit() {
  	this._auth.authCheck().subscribe(
        res => {;},
        err => {
              this._router.navigate(['/admin/login']);
        }
      )
    this._events.getCategories().subscribe(
    res => {
      for(let i=0; i<res.length;i++){
        this.categories.push(res[i].title);
      }});
    this.onSubmit();
  }

  onSubmit() {
    this.searchArticle();
  }

  searchArticle(){
  	if(this._auth.loggedIn()){
  		this._auth.searchArticle(this.model).subscribe(
          res => {
            this.lastsearch=this.model;
            this._communicator.searchCommunication(res);
          },
          err => console.log(err)
        );
  	}
  }

  afterDelete(){
    if(this._auth.loggedIn()){
      this._auth.searchArticle(this.lastsearch).subscribe(
          res => {
            this._communicator.searchCommunication(res);
          },
          err => console.log(err)
        );
    }
  }

}
