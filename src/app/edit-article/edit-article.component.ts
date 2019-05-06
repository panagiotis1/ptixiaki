import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';
import { CommunicatorService } from '../communicator.service';
import { CreateArticle } from "../form-models/create-article";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit{
  categories = [];
  model:CreateArticle;
  constructor(private _auth: AuthService,
              private _events: EventsService,
  			      private _communicator: CommunicatorService,
              private _router: Router) {}

  ngOnInit() {
    this._auth.authCheck().subscribe(
      res => {;},
      err => {
        this._router.navigate(['/admin/login']);
      }
    );
    this._communicator.getArticle().subscribe(
        communicator=>{
          if(communicator){
            this.model=communicator;
          }else{
            this._router.navigate(['/admin/create-article']);
          }
        }
    );
    this._events.getCategories().subscribe(
      res => {
        for(let i=0; i<res.length;i++){
          this.categories.push(res[i].title);
        }});
  }

  onSubmit() {
    this.editarticle();
  }

  editarticle(){
  	if(this._auth.loggedIn()){
  		this._auth.editArticle(this.model).subscribe(
          res => {
            this._router.navigate(['/admin/search-article']);
          },
        err => {console.log(err);}
        );
  	}else{
  		console.log("you are not logged");
  	}
  }

}
