import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-podosfairo',
  templateUrl: './podosfairo.component.html',
  styleUrls: ['./podosfairo.component.css']
})
export class PodosfairoComponent implements OnInit {
  articles=[];

  constructor(private _events: EventsService) { }

  ngOnInit() {
  	this._events.podosfairo().subscribe(
  		res => {console.log("OKKK");
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
