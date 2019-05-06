import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  articles = [];

  constructor(private _events: EventsService) { }

  ngOnInit() {
  	this._events.homePage().subscribe(
  		res => {
  			this.articles=res;
  			for(let i=0; i<this.articles.length; i++){
  				if(this.articles[i].article){
  					if(this.articles[i].article.length > 80){
  						this.articles[i].subarticle=this.articles[i].article.slice(0,80)+"...";
  					}else{
  						this.articles[i].subarticle=this.articles[i].article;
  					}
  				}
  			}
  		},
  		err => {
  			console.log("ERROR");
  		}
  	)
  }

}
