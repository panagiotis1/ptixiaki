import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
const localhost = "http://localhost:3000/api/";
const server = "https://peaceful-island-82167.herokuapp.com/api/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authCheckUrl = server + "auth-check";
  private _adminCheckUrl = server + "admin-check";
  private _createArticleUrl = server + "create-article";
  private _searchArticleUrl = server + "search-article";
  private _editArticleUrl = server + "edit-article";
  private _deleteArticleUrl = server + "delete-article";
  private _searchUserUrl = server + "search-user";
  private _editUserUrl = server + "edit-user";
  private _deleteUserUrl = server + "delete-user";

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
