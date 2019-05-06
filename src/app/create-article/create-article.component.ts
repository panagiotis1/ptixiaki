import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';
import { CommunicatorService } from '../communicator.service';
import { CreateArticle } from "../form-models/create-article";

@Component({
  selector: 'app-createarticle',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  categories = [];
  model: CreateArticle = {"title":"", "description":"", "keywords":"", "category":"Διάλεξε κατηγορία", "article":""};
  constructor(private _auth: AuthService,
              private _events: EventsService,
              private _communicator: CommunicatorService,
              private _router: Router) { }

  ngOnInit() {
    this._auth.authCheck().subscribe(
        res => {;},
        err => {
              this._router.navigate(['/admin/login']);
        });
    this._events.getCategories().subscribe(
        res => {
          for(let i=0; i<res.length;i++){
            this.categories.push(res[i].title);
          }});
  }

  onSubmit() {
    this.createArticle();
  }

  createArticle(){
  	if(this._auth.loggedIn()){
  		this._auth.createArticle(this.model).subscribe(
          res => {
            this._communicator.alertCommunication({"success":res.message});
          },
          err => {
            this._communicator.alertCommunication({"error":err.error});
          });
  	}
  }
}
