import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const localhost = "http://localhost:3000/api/";
const server = "https://peaceful-island-82167.herokuapp.com/api/"

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private _basketUrl = server + "basket";
  private _podosfairoUrl = server + "podosfairo";
  private _homePageUrl = server + "home-page";
  private _loginUrl = server + "login";
  private _registerUrl = server + "register";
  private _getCategoriesUrl = server + "get-categories";

  constructor(private http: HttpClient) {}
  homePage(){
    return this.http.get<any>(this._homePageUrl);
  }

  podosfairo(){
    return this.http.get<any>(this._podosfairoUrl);
  }

  basket(){
    return this.http.get<any>(this._basketUrl);
  }

  loginUser(user){
    return this.http.post<any>(this._loginUrl, user);
  }

  registerUser(user){
    return this.http.post<any>(this._registerUrl, user);
  }

  getCategories(){
    console.log("this runs");
    return this.http.get<any>(this._getCategoriesUrl);
  }
}
