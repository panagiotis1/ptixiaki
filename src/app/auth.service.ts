import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authCheckUrl = "http://localhost:3000/api/auth-check";
  private _adminCheckUrl = "http://localhost:3000/api/admin-check";
  private _createArticleUrl = "http://localhost:3000/api/create-article";
  private _searchArticleUrl = "http://localhost:3000/api/search-article";
  private _editArticleUrl = "http://localhost:3000/api/edit-article";
  private _deleteArticleUrl = "http://localhost:3000/api/delete-article";
  private _searchUserUrl = "http://localhost:3000/api/search-user";
  private _editUserUrl = "http://localhost:3000/api/edit-user";
  private _deleteUserUrl = "http://localhost:3000/api/delete-user";

  constructor(private http: HttpClient,
              private _router: Router) { }
//~~~~~~~~~~~~~~~~~~~~~ Auth Check ~~~~~~~~~~~~~~~~~~~~~
  authCheck(){
    return this.http.get<any>(this._authCheckUrl);
  }

  //Χρησιμοποιείται μόνο για το front-end κομμάτι του μενού. Δεν δίνει πρόσβαση.
  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('position');
    this._router.navigate(['/admin/login']);
  }

  //Χρησιμοποιείται στο token-interceptor για πέρασμα του token στο header.
  getToken() {
    return localStorage.getItem('token');
  }

//~~~~~~~~~~~~~~~~~~~~~ Admin Check ~~~~~~~~~~~~~~~~~~~~~
  adminCheck(){
    return this.http.get<any>(this._adminCheckUrl);
  }
  
  //Χρησιμοποιείται μόνο για το front-end κομμάτι του μενού. Δεν δίνει πρόσβαση.
  isAdmin(){
    return localStorage.getItem('position')=="Διαχειριστής";
  }

//~~~~~~~~~~~~~~~~~~~~~ Auth post requests ~~~~~~~~~~~~~~~~~~~~~

  createArticle(article){
    return this.http.post<any>(this._createArticleUrl, article);
  }

  searchArticle(article){
    return this.http.post<any>(this._searchArticleUrl, article);
  }

  editArticle(article){
    return this.http.post<any>(this._editArticleUrl, article);
  }

  deleteArticle(ID){
    return this.http.post<any>(this._deleteArticleUrl, {'ID':ID});
  }

  searchUser(user){
    return this.http.post<any>(this._searchUserUrl, user);
  }

  editUser(user){
    return this.http.post<any>(this._editUserUrl, user);
  }

  deleteUser(ID){
    return this.http.post<any>(this._deleteUserUrl, {'ID':ID});
  }
}
