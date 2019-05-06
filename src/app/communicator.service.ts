import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {
  article;
  user;
  
  private communicatorSearchSource = new Subject<object>();
  private communicatorTableSource = new Subject<string>();
  private communicatorSearchUserSource = new Subject<object>();
  private communicatorTableUserSource = new Subject<string>();
  private communicatorAlertSource = new Subject<any>();

  communicatorSearch$ = this.communicatorSearchSource.asObservable();
  communicatorTable$ = this.communicatorTableSource.asObservable();
  communicatorSearchUser$ = this.communicatorSearchUserSource.asObservable();
  communicatorTableUser$ = this.communicatorTableUserSource.asObservable();
  communicatorAlert$ = this.communicatorAlertSource.asObservable();

  constructor(private _router: Router) { }

  searchCommunication(data: object){
  	this.communicatorSearchSource.next(data);
  }

  tableCommunication(article: string){
  	this.communicatorTableSource.next(article);
  }

  searchUserCommunication(data: object){
    this.communicatorSearchUserSource.next(data);
  }

  tableUserCommunication(text: string){
    this.communicatorTableUserSource.next(text);
  }

  alertCommunication(alert: any){
    this.communicatorAlertSource.next(alert);
  }

  editUserCommunication(user: object){
    this.user = user;
    console.log("correct one");
    this._router.navigate(['/admin/edit-user']);
  }

  getUser() {
    return of(this.user);
  }

  editCommunication(article: object){
    this.article = article;
    this._router.navigate(['/admin/edit-article']);
  }

  getArticle() {
    return of(this.article);
  }


}
